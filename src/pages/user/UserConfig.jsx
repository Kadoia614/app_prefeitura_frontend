import Avatar from '../../assets/img/avatar2.svg'
import {useForm} from 'react-hook-form'
import InputField from '../../components/shared/input/InputField'

const UserConfig = () => {

    return(
        <div id="UserConfig" className='p-15'>
            <div className="mx-auto user-card shadow-2xl rounded-md p-4 w-150 flex items-center flex-col">
                <img src={Avatar} alt="Avatar" className='rounded-full overflow-hidden w-50' />
                <br />
                <div id='UserData'>
                    <form>
                        <InputField id={"username"} label={"Username"} value={"username"}></InputField>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default UserConfig;