import React, { useContext, useEffect } from 'react'
import Modal from '../../../components/modal';
import * as yup from 'yup';
import es from 'yup-es'

import './style.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createMove, deleteMove } from '../../../services';
import { AuthContext } from '../../../routes/Routes';
import Swal from 'sweetalert2';

yup.setLocale(es)

const schema = yup.object({
    type: yup.string().required(),
    value: yup.string().required(),
    observation: yup.string().required(),
}).required()

const Form = ({ isEdit, username, setLoading, loading, dataModal }) => {

    const { setShowModal } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            type: '1'
        }
    });

    useEffect(() => {
        if (isEdit) {
            reset({
                type: dataModal?.type,
                value: dataModal?.value,
                observation: dataModal?.observation,
            })
        }
    }, [dataModal, isEdit, reset])


    const handleCancel = () => {
        setShowModal(false);
    }

    const onSubmit = async (data) => {
        Swal.showLoading()
        try {
            if (!isEdit) {
                await createMove(data, username);
            }
            else {
                await deleteMove(dataModal?.id, username);
            }
            setShowModal(false);
            setLoading(!loading);
            Swal.fire(
                'Bien hecho!',
                'Se ha guardado con éxito!',
                'success'
            )
        } catch (error) {
            setShowModal(false);
            Swal.fire(
                'Error',
                'Hubo un problema al guardar!',
                'error'
            )
        }
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit(onSubmit)} className='modal__form'>
                <h2>{isEdit ? 'Ver Movimiento' : 'Registro de Movimiento'}</h2>
                {dataModal?.date_bill ?
                    <span className='label'>{new Date(dataModal.date_bill).toLocaleString()}</span>
                    : ''
                }
                <label className='label'>
                    Descripción
                    <textarea
                        placeholder='Descripción'
                        rows={3}
                        {...register('observation', { required: true })}
                    />
                    {errors.observation &&
                        <span className='form__error'>{errors.observation?.message}</span>
                    }
                </label>
                <label className='label'>Tipo de Movimiento</label>

                <div className="options">
                    <label>
                        <input
                            type='radio'
                            {...register('type', { required: true })}
                            value='1'
                            name='type'
                        />
                        Ingreso
                        {errors.type &&
                            <span className='form__error'>{errors.type?.message}</span>
                        }
                    </label>

                    <label>
                        <input
                            type='radio'
                            {...register('type', { required: true })}
                            value='2'
                            name='type'
                        />
                        Egreso
                    </label>
                </div>

                <label className='label'>
                    Valor
                    <input
                        type="text"
                        placeholder='Valor'
                        {...register('value', { required: true })}
                    />
                    {errors.value &&
                        <span className='form__error'>{errors.value?.message}</span>
                    }
                </label>

                <div className="form__actions">
                    <button type='submit' className='button button-primary'>{isEdit ? 'Eliminar' : 'Registrar'}</button>
                    <button type='button' className='button button-secondary' onClick={handleCancel}>Cancelar</button>
                </div>

            </form>
        </Modal>
    )
}

export default Form