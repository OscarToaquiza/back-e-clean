const {response, request} = require('express');
const CabeceraRutaTable = require('../models/cabeceraRuta');
const DetalleRutaTable = require('../models/detalleRuta');
const PuntoGeograficoTable = require('../models/puntoGeografico');

const getRutas = async (req = request,res = response) =>{
    
    const { limite = 10, desde = 0 } = req.query;

    const rutas = await CabeceraRutaTable.findAndCountAll(
        { offset: Number(desde), limit: Number(limite) }
    );
    res.status(200).json({
        rutas
    });

}

const getRutaCompleta = async (req = request,res = response) =>{

    const id = req.params.id_cabecera_ruta;
    const ruta = await CabeceraRutaTable.findByPk(id,{
        attributes: ["id_cabecera_ruta","nombre","diasrutas","horario"],
        include: [
            {
                model: DetalleRutaTable,
                as: "detalleruta",
                attributes: ["id_detalle_ruta"],
                include: [
                    {
                        model: PuntoGeograficoTable,
                        as: "punto",
                        attributes: ["longitud","latitud"]
                    }
                ]
            }
        ]
    });

    res.status(200).json({
        ruta
    });
}

// const putEmpresaRecicladora = async (req = request,res = response) =>{

//     const id = req.params.id_empresa_recicladora;
//     const { id_empresa_recicladora, ... dataEmpresaRecicladora } = req.body;
//     const empresaRecicladora = await EmpresaRecicladoraTable.update(
//         dataEmpresaRecicladora,
//         {where: {id_empresa_recicladora: id}
//     });

//     res.status(200).json({
//         empresaRecicladora
//     });
// }

const postCabeceraRuta = async (req,res = response) =>{

    try {
        const {dataCabecera, listaPuntosGeograficos} = req.body;
        // console.log(dataCabecera);
        // console.log(listaPuntosGeograficos);
    
        const ruta = new CabeceraRutaTable( dataCabecera );
        await ruta.save();
    
        //Cabecera ok.
        if( listaPuntosGeograficos != undefined ){
            if(listaPuntosGeograficos.length > 0){
                for (let index = 0; index < listaPuntosGeograficos.length; index++) {
    
                    let punto = new PuntoGeograficoTable(
                        {
                            nombre: ruta.nombre,
                            longitud: listaPuntosGeograficos[index][0] ,
                            latitud: listaPuntosGeograficos[index][1]
                        }
                     );
    
                    await punto.save();
    
                    let detalle = new DetalleRutaTable(
                        {
                            id_cabecera_ruta: ruta.id_cabecera_ruta,
                            id_punto_geografico: punto.id_punto_geografico
                        }
                    );
    
                    await detalle.save();
                }
            }
        }
        
        res.status(200).json({
            ruta
        });
    } catch (error) {
        res.status(500).json({
            msg: ""+error
        });
    }


}

module.exports = {
    postCabeceraRuta,
    getRutas,
    getRutaCompleta
}