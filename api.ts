
/**
 *   const API = api({
    '/login': get/post/delete/put({
        parameters: {
        name: type().in(query|header|path).required.description()
        }
        requestBody:ref().description()
        responses:{
            200:ref().description()
            401:ref().description()
        }
      or  
        parameters: {
            name:{
                in:'',
                description:'',
                required:true
                schema:{
                    type: array
                    items:
                        type: string
                        default: available
                        enum:
                        - available
                        - pending
                        - sold
                }
            }
        },
        requestBody: {description:'',content:{
            'application/json':schema:ref()
            'application/xml':schema:ref()
        }},
        
        responses:{
            200:{description:'',content:{
                'application/json':schema:ref()
                'application/xml':schema:ref()
                }},
            401:{description:'',content:{
                'application/json':schema:ref()
                'application/xml':schema:ref()
            }}
            }
    })
  });
 */