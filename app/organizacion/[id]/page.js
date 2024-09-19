'use client'
 
import { useState, useEffect } from 'react';
import { Card, Text, Grid } from '@nextui-org/react';
import { useRouter, useSearchParams  } from 'next/navigation'

export default function Page({ params : { id } }){
    const [organizacion, setOrganizacion] = useState(null);
    
    console.log({id})
    useEffect(() => {
        const fetchOrganizacion = async () => {
            try {
                const response = await fetch(`https://helpme-server-g9fncxffcsbceqa5.brazilsouth-01.azurewebsites.net/api/Organizacion/${id}`);
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                const data = await response.json();
                setOrganizacion(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrganizacion();
    }, [id]);

  if (!organizacion) {
    return <Text>Cargando...</Text>;
  }


  return (
    <Grid.Container gap={2}>
      <Grid xs={12} sm={6}>
        <Card>
          <Card.Header>
            <Text h4>{organizacion.nombreOrganizacion}</Text>
          </Card.Header>
          <Card.Body>
            <Text>{organizacion.descripcion}</Text>
            <Text>Cuit: {organizacion.cuit}</Text>
            <Text>Localidad: {organizacion.localidad}</Text>
            <Text>Provincia: {organizacion.provincia}</Text>
            <Text>Fecha de Creación: {new Date(organizacion.fechaDeCreacion).toLocaleDateString()}</Text>
            <Text>Email: {organizacion.email}</Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   return {
//     props: {
//       id,
//     },
//   };
// }
