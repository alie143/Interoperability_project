  class ServiceMonitor {
    constructor( services){
        this.services = services
    }
    async monitor  () {
        let status = {
            url  : {},
            alias: {}
        }
        for ( let service of this.services ) {
            let isAlive = await this.ping ( service )
        //    status.url  [ `${service.address}:${service.port}` ] = isAlive
	status.url  [ `networkStatus` ] = isAlive
		status.url[ `vm_details` ]=`${service.address}:${service.port}`
            status.alias[ service.service                      ] = isAlive
        }
        return status
    }
    ping ( connection ) {
        return new Promise ( ( resolve, reject )=>{
            const tcpp = require('tcp-ping');
            tcpp.ping( connection,( err, data)=> {
                let error = data.results [0].err            
                if ( !error ) {
                    resolve ( true )
                }
                if ( error ) {
                    resolve ( false )
                }
            });
        })        
    }
}

exports.test = async (services) => {
   /* let services = [
        {
            service : "redis_local",
            address : ip,
            port    : port_n,
            timeout : 1000,
            attempts: 1
        }
	    ,
	{
            service : "redis_local",
            address : "10.210.12.215",
            port    : 3002,
            timeout : 1000,
            attempts: 1
        },
        {
            service : "redis_local",
            address : "10.210.12.184",
            port    : 3002,
            timeout : 1000,
            attempts: 1
        }

    ],*/
    status = await new ServiceMonitor ( services ).monitor ()
    console.log ( status )
	return status;
}





