import React from "react";
import Axios from "axios";
import Mapir from 'mapir-react-component';
import 'antd/dist/antd.css';
import { GiTwoCoins } from "react-icons/gi";
import { FaChess, FaMapMarkerAlt } from "react-icons/fa";
import { Row, Col, Image, Carousel } from 'antd';
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
        id: "105",
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
        longitude: "",
        Gamestring: "",

    }


    componentDidMount() {
        const id=window.location.href.substring(32);
        //const id = this.props.match.params.id
        console.log(id)
        Axios.get('http://localhost:8010/proxy/cafe/cafe_info/' + id+"/", {
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
                    this.setState({Gamestring: this.state.Gamestring+ element.name + ","}) 
                });
                this.setState({ gallery: cafe.gallery });
                this.setState({ price: cafe.price });
                this.setState({ open_time: cafe.open_time });
                this.setState({ close_time: cafe.close_time });
                this.setState({ phone_number: cafe.phone_number });
                this.setState({ latitude: cafe.latitude });
                this.setState({ longitude: cafe.longitude });
                console.log(this.state.gallery)

            })
    }



    render() {
        return (
            <div className="SingleCafeShow_container" style={{marginTop: '5%'}}>
                <Row>
                    <Col span={8}>
                        <Carousel autoplay className="Gallery">
                            {
                                this.state.gallery.split('**').forEach(element => {
                                    <div>
                                        <Image
                                            width="auto"
                                            height="auto"
                                            src={this.state.gallery.split('**')[0]}
                                        />

                                    </div>
                                })
                            }
                        </Carousel>
                    </Col>
                    <Col span={16}>
                        <div className="cafe_info">
                            <h1 >{this.state.name}</h1>
                            <h2><FaChess /> {this.state.Gamestring}</h2>
                            <h3><GiTwoCoins /> {this.state.price}</h3>
                            <h4> <FaMapMarkerAlt />  {this.state.description}</h4>

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


                    </Col>
                </Row>
            </div>
        )
    }
}
export default SingleCafeShow