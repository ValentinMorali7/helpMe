import { Link } from '@nextui-org/link'

import { title, subtitle } from '@/components/primitives'
import StyledButton from '../components/button'
import Login from '../components/login'

export default function App() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>Somos&nbsp;</span>
                <span className={title({ color: 'blue' })}>HelpMe!&nbsp;</span>
                <br />

                <div className={subtitle({ class: 'mt-4' })}>
                    Por favor, inicia sesión o regístrate.
                </div>
                <Login />
            </div>
        </section>
    )
}
