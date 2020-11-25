import React from "react";
import Axios from "axios";
import Mapir from 'mapir-react-component';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { GiTwoCoins } from "react-icons/gi";
import { FaChess } from "react-icons/fa";
import { Row, Col,Image, Carousel} from 'antd';
const Map = Mapir.setToken({
    transformRequest: (url) => {
        return {
            url: url,
            headers: {
                'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3In0.eyJhdWQiOiIxMTU3MyIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3IiwiaWF0IjoxNjA2MDM1OTYwLCJuYmYiOjE2MDYwMzU5NjAsImV4cCI6MTYwODU0MTU2MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GlBztlovbk9H-x4WErTuD3Cth2bp1Bd4myRJ96uOEYOy3LlK2RQEq-4G3hPDQ8IGuEq18vmBakeh7UNg0OA1BCFb5AwDUEl7kzO4wmZ6-AZrGo92b9AQ--5aGLhqUEYcTi0Y0DXOxviyeBM49eHGzmm6Oa0bJ1eRvDG6C07UH4MvMNfv0xwpSMoB9czJSwyfUYzXR9P0St4-ayv6nxOmsAiDUb-1gfUCNff-HHiiLq0z_eVa0Fy_Vj11aC0smz1T7_qQvzMkOhHGptxYDICqNFXYpgNjf_eELdk67_DLrn6-bG5HNC82gr4ZEeFOmuh7Ka5jdl_AMM09oAT1UypXNQ', //Mapir api key

                'Mapir-SDK': 'reactjs'
            },
        }
    }
});


class SingleCafeShow extends React.Component {
    state = {
        // id:"",
        // name:"",
        // owner:"",
        // description:"",
        // games:[],
        // price:"",
        // latitude:"",
        // longitude:""

        id: "02",
        name: "lamiz",
        owner: "rajabi",
        description: "asdfghjkl;oiuytrexcvbnm,;lkjuytredtyuio.,mdedrtuiop;lkjgfdyui",
        games: ["monopoly", "pantagon", "mench"],
        images: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
        price: "12000",
        latitude: "35.6892",
        longitude: "51.3890"
    }
    

    



    render() {
        return (
            <div className="SingleCafeShow_container">
                <Row>
                    <Col span={8}>
                        <Carousel autoplay className="Gallery">
                            <div>
                                <Image
                                    width="auto"
                                    height="auto"
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </div>
                            <div>
                                <Image
                                    width="auto"
                                    height="auto"
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </div>
                        </Carousel>
                    </Col>
                    <Col span={16}>
                        <div className="cafe_info">
                            <h1 >{this.state.name}</h1>
                            <h2><FaChess />  {this.state.games.join(' , ')}</h2>
                            <h3><GiTwoCoins /> {this.state.price}</h3>
                            <h4>   {this.state.description}</h4>
                            
                            <div>
                             <Mapir  className="map" 
                                center={[this.state.longitude, this.state.latitude]}
                                Map={Map}
                            >
                                
                                 <Mapir.Layer
                                    type="symbol"
                                    layout={{ "icon-image": "harbor-15" }}>
                                </Mapir.Layer> 
                                <Mapir.Marker
                                    coordinates={[this.state.longitude, this.state.latitude]}
                                    anchor="bottom">
                                </Mapir.Marker>
                            </Mapir> 
                            </div>
                            </div>
                        
                      
                    </Col>
                </Row>
            </div>
        )
    }
}
export default SingleCafeShow