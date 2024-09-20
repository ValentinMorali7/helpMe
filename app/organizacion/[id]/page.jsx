'use client'
import { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Spinner} from "@nextui-org/spinner";

const Page = ({ params : { id } }) => {
    const [organizacion, setOrganizacion] = useState(null);
    
    useEffect(() => {
        const fetchOrganizacion = async () => {
            try {
                const rawToken = localStorage.getItem('loggedUser') ?? null;  
                const token = JSON.parse(rawToken).token
                const response = await fetch(`https://helpme-server-g9fncxffcsbceqa5.brazilsouth-01.azurewebsites.net/api/Organizacion/${id}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,  // Agrega el token aquí
                      'Content-Type': 'application/json',
                    },
                  });
                if (!response.ok) {
                    console.log('error response')
                    throw new Error('Error al cargar los datos');
                }
                const data = await response.json();
                setOrganizacion(data);
            } catch (error) {
                console.log('error ')
                console.error(error);
            }
        };

        fetchOrganizacion();
    }, [id]);

  if (!organizacion) {
    return <Spinner label="Cargando..." color="warning" />;
  }

  return (
    <Card className="max-w-[800px] max-h-[600px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="Logo de la organización"
          height={40}
          radius="sm"
          src={'https://avatars.githubusercontent.com/u/86160567?s=200&v=4'} // Agregar un campo 'logo' a tu modelo de organización
          width={40}
        />
        <div className="flex flex-col">
          <div>{organizacion.nombreOrganizacion}</div>
          <div>
            {organizacion.localidad ?? 'Localidad'}, {organizacion.provincia ?? 'Provincia'}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>{organizacion.descripcion}</div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href={`mailto:${organizacion.email}`}
        >
          Contactar
        </Link>
        <Link
          isExternal
          showAnchorIcon
          href={`https://www.google.com/maps/search/?api=1&query=${organizacion.direccion}`} // Agregar un campo 'direccion' a tu modelo de organización
        >
          Ver ubicación
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Page;