import axios from 'axios'
import assert from 'assert'
import { conectar, desconectar } from '../src/server.js'

describe('servidor prueba mocha', () => {

    before(async () => {
        await conectar({ port:8080 })
    })

    after(async () => {
        await desconectar()
    })

    beforeEach(() => { })

    afterEach(() => { })

    // describe('register', () => {
    //     describe('al enviar datos correctos', () => {
    //         it('deberia devolver un mensaje Registrado con exito', async () => {
    //             const { data } = await axios.post('http://localhost:8080/auth/signup',{
    //                 name: "leandro",
    //                 email: "algu@gmail.com", 
    //                 password:"12345", 
    //                 confirm_password:"12345", 
    //                 direccion:"calle3117",
    //                 edad:"34", 
    //                 cod_area:"03496", 
    //                 nro_tel:"15555666"
    //             })
    //             assert.strictEqual(data.message,"Registrado con exito")
    //         })
    //         it('deberia devolver un codigo 201', async () => {
    //             const { status } = await axios.post('http://localhost:8080/auth/signup',{
    //                 name: "leandro",
    //                 email: "alguno@gmail.com", 
    //                 password:"12345", 
    //                 confirm_password:"12345", 
    //                 direccion:"calle3117",
    //                 edad:"34", 
    //                 cod_area:"03496", 
    //                 nro_tel:"15555666"
    //             })
    //             assert.strictEqual(status, 201)
    //         })
    //     })
    //     describe('al enviar datos incorrectos', () => {
    //         it('deberia devolver un error con los campos que faltan o estan mal', async () => {
    //             return assert.rejects(
    //                 axios.post('http://localhost:8080/auth/signup',{
    //                     name: "leandro",
    //                     email: "alguien@gmail.com", 
    //                     password:"12345", 
    //                     confirm_password:"12345",
    //                 }),
    //                 error => {
    //                     assert.strictEqual(error.response?.status, 400)
    //                     return true
    //                 }
    //             )
    //         })
    //     })
    // })

    describe('productos', () => {
        describe('al solicitar los productos', () => {
            it('deberia devolver un listado de productos con sus datos', async () => {
                const { data } = await axios.get('http://localhost:8080/productos',{})
                assert.ok(data)
            })
            it('deberia devolver un codigo 200', async () => {
                const { status } = await axios.get('http://localhost:8080/productos')
                assert.strictEqual(status, 200)
            })
        })

        describe('al ingresar un producto nuevo', () => {
            describe('al enviar datos correctos', () => {
                it('deberia agregar una producto y devolver un mensaje producto agregado', async () => {
                    const { data } = await axios.post('http://localhost:8080/productos/new-producto', {
                        nombre: 'Zapato',
                        descripcion: 'Zapato marca Ringo',
                        codigo: '1001', 
                        foto: 'https://via.placeholder.com/150', 
                        precio: '10000', 
                        stock:'5'
                    })
                    assert.strictEqual(data.message, "Producto Agregado")
                })
    
                it('deberia devolver un codigo 201', async () => {
                    const { status } = await axios.post('http://localhost:8080/productos/new-producto', {
                        nombre: 'Zapato',
                        descripcion: 'Zapato marca Ringo',
                        codigo: '1001', 
                        foto: 'https://via.placeholder.com/150', 
                        precio: '10000', 
                        stock:'5'
                    })
                    assert.strictEqual(status, 201)
                })
            })
            describe('al enviar datos incorrectos', () => {
                it('deberia dar un error con un mensaje sobre que dato falto o esta mal', async () => {
                    return assert.rejects(
                        axios.post('http://localhost:8080/productos/new-producto', {
                        nombre: 'Zapato',
                        descripcion: 'Zapato marca Ringo',
                        codigo: '1001', 
                        foto: 'https://via.placeholder.com/150',
                        }),
                        error => {
                            assert.strictEqual(error.response?.status, 400)
                            return true
                        }
                    )
                })
            })
        })

        describe('al ingresar actualizar los datos de un producto', () => {
            describe('al enviar datos correctos', () => {
                it('deberia actualizar los datos de un producto y devolver un mensaje producto actualizado', async () => {
                    const { data } = await axios.put('http://localhost:8080/productos/edit-producto/62bbcc4adf6df65823d188a7', {
                        nombre: 'Zapato',
                        descripcion: 'Zapato marca Ringo',
                        codigo: '1001', 
                        foto: 'https://via.placeholder.com/150', 
                        precio: '10000', 
                        stock:'5'
                    })
                    assert.strictEqual(data.message, "Producto actualizado")
                })
    
                it('deberia devolver un codigo 201', async () => {
                    const { status } = await axios.put('http://localhost:8080/productos/edit-producto/62bbcc4adf6df65823d188a7', {
                        nombre: 'Zapato',
                        descripcion: 'Zapato marca Ringo',
                        codigo: '1001', 
                        foto: 'https://via.placeholder.com/150', 
                        precio: '10000', 
                        stock:'5'
                    })
                    assert.strictEqual(status, 201)
                })
            })
            describe('al enviar datos incorrectos', () => {
                it('deberia dar un error con un mensaje sobre que dato falto o esta mal', async () => {
                    return assert.rejects(
                        axios.put('http://localhost:8080/productos/edit-producto/62bbcc4adf6df65823d188a7', {
                        nombre: 'Zapato',
                        descripcion: 'Zapato marca Ringo',
                        codigo: '1001', 
                        foto: 'https://via.placeholder.com/150',
                        }),
                        error => {
                            assert.strictEqual(error.response?.status, 400)
                            return true
                        }
                    )
                })
            })
        })

        describe('al intentar eliminar un producto', () => {
            describe('al enviar datos correctos', () => {
                it('deberia eliminar el producto y devolver un mensaje producto eliminado', async () => {
                    const { data } = await axios.delete('http://localhost:8080/productos/delete/62bbcc4adf6df65823d188a7', {})
                    assert.strictEqual(data.message, "Producto Eliminado")
                })
    
                it('deberia devolver un codigo 201', async () => {
                    const { status } = await axios.delete('http://localhost:8080/productos/delete/62bbcc4adf6df65823d188a7', {})
                    assert.strictEqual(status, 201)
                })
            })            
        })
    })
})