
/**
 *   const API = api({
    '/login': get/post/delete/put({
        // 完全重新生成
        parameters({
            name: type().in(query|header|path).required.description()
            }
        ),
        // Model变体，或完全重构
        // api需不需要耦合model，不耦合，变换的关联性弱，可行的方案（ 抽象一层 映射两者，并模板化变换）
        // 如果必须要基于Model变体，则业务灵活性，是否都能满足，完全是中间结果，如和存储模型完全的不同的情形
        requestBody(Model|{name:ref().description()}|{...Model}),
        responses({
            200:ref().description()
            401:ref().description()
        }) 
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