import React from "react";
import Axios from "axios";
import Mapir from 'mapir-react-component';
import 'antd/dist/antd.css';
import { GiTwoCoins,GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import {  FaMapMarkerAlt,FaClock } from "react-icons/fa";
import { Row, Col,  Carousel ,Tag} from 'antd';
import '../../Style/SingleCafeShow.css'
import '../../Style/design.scss';
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
        id: "110",
        name: "",
        owner: "",
        description: "",
        games: [],
        price: "",
        open_time: "",
        close_time: "",
        phone_number: "",
        gallery: "",
        latitude: "",
        city:"",
        longitude: "",
        Gamestring: "",
        galleryarray: []

    }


    componentDidMount() {
        //const id=window.location.href.substring(32);
        //const id = this.props.match.params.id
        Axios.get('http://localhost:8010/proxy/cafe/cafe_info/' + this.state.id + "/", {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        )
            .then(res => {
                const cafe = res.data;
                console.log(cafe);
                this.setState({ name: cafe.name });
                this.setState({ owner: cafe.owner });
                this.setState({ description: cafe.description });
                this.setState({ games: cafe.games });
                this.state.games.forEach(element => {
                    this.setState({ Gamestring: this.state.Gamestring +","+ element.name })
                });
                this.setState({ gallery: cafe.gallery });
                this.setState({ city: cafe.city });
                this.setState({ price: cafe.price });
                this.state.gallery.split('***').forEach(element => {
                    this.state.galleryarray.push(element)
                });
                this.setState({ open_time: cafe.open_time });
                this.setState({ close_time: cafe.close_time });
                this.setState({ phone_number: cafe.phone_number });
                this.setState({ latitude: cafe.latitude });
                this.setState({ longitude: cafe.longitude });
            })
    }

onclicktag=(id)=>{
window.location.href='/allgames/:'+id
}

    render() {
        return (
            <div className="SingleCafeShow_container">

                
                    <div className="cafe_info">
                        <h2 >{this.state.name}</h2>
                        <div className="carousel_container">
                            <Carousel autoplay className="Gallery">
                                {
                                    this.state.galleryarray.map(item =>
                                        <img src={item}></img>
                                    )
                                }
                            </Carousel>
                        </div>
                        <h5 display='inline'> <GiPerspectiveDiceSixFacesSix  />  Board Games</h5>
                        {
                            this.state.games.map(item=>

                                <Tag onClick={()=>this.onclicktag(item.id)}> {item.name} </Tag>
                            )
                        }
                         
                        <h5><GiTwoCoins /> {this.state.price}</h5>
                        <h6> <FaMapMarkerAlt />  {this.state.city}</h6>
                        <h6> <FaClock />{this.state.open_time} to {this.state.close_time}</h6>
                        <h6> {this.state.description}</h6>

                        <div>
                            <Mapir className="map"
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
             

            </div>
        )
    }
}
export default SingleCafeShow