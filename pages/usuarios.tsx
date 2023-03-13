import styles from '../styles/Usuarios.module.css';
import api from '../libs/api';
import { User } from '@/types/User';

type Props = {
    users: User[];
}

const usuarios = ({users}: Props) => {
  return (
   
        <div>
            
            <h1>Página usuário</h1>
        </div>
   
  )
}

export const getServerSideProps = async () => {
    // DRY = dont Repeat Yourself
    const users = await api.getAllUsers(0);


    return {
        props: {
            users
        }
    }
}


export default usuarios