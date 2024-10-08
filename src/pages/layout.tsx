import { SideNav } from "../blocks/sideNav";
import './layout.css';

type Props = {
    children:React.ReactNode,
}

export function Layout({children}:Props) {

    return(
        <div className="page">
            <SideNav/>
            <main>
                {children}
            </main>
        </div>
    );
};