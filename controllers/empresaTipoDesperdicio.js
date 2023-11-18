const {response, request} = require('express');
const { QueryTypes } = require('sequelize');
const EmpresaTipoDesperdicioTable = require('../models/empresaTipoDesperdicio');

const getEmpresaTiposDesperdicios = async (req = request,res = response) =>{
    
    const id = req.params.id_empresa;

    const tiposDesperdicios = await EmpresaTipoDesperdicioTable.sequelize.query(
        `select etd.id_empresa_tipo_desperdicio, etd.id_tipo_desperdicio, td.nombre 
        from empresa_tipo_desperdicio etd 
        left join tipo_dato td on etd.id_tipo_desperdicio = td.id_tipo_dato 
        where etd.id_empresa_recicladora = ${id}`,
        { type: QueryTypes.SELECT }
    )
    res.status(200).json({
        tiposDesperdicios
    });

}


const deleteEmpresaTipoDesperdicio = async (req = request,res = response) =>{

    const id_empresa_tipo_desperdicio = req.params.id_empresa_tipo_desperdicio;
    const empresaRecicladora = await EmpresaTipoDesperdicioTable.destroy(
        {
            where: {id_empresa_tipo_desperdicio}
        }
    )
    res.status(200).json({
        empresaRecicladora
    });
}

const postEmpresaTipoDesperdicio = async (req,res = response) =>{

    const { id_empresa, listaTipoDatos } = req.body;
    const msg = [];

    if( id_empresa != undefined && listaTipoDatos != undefined ){
        if(listaTipoDatos.length > 0){
            
            for (let index = 0; index < listaTipoDatos.length; index++) {
                //Verificar si ya existe este registro o se crea
                let existe = await EmpresaTipoDesperdicioTable.findOrCreate(
                    {
                        where: { id_empresa_recicladora: id_empresa, id_tipo_desperdicio: listaTipoDatos[index] }
                    }
                );
                
                if(existe[1]){
                    msg.push("Tipo Agregado");
                }else{
                    msg.push("Tipo Existe");
                }
            }
        }
    }
    
    res.status(200).json({
        msg
    });
}

module.exports = {
    getEmpresaTiposDesperdicios,
    postEmpresaTipoDesperdicio,
    deleteEmpresaTipoDesperdicio
}