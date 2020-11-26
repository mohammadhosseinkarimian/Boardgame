import React from "react";
import { Card, List} from "antd";
import "antd/dist/antd.css";
import { CoffeeOutlined } from "@ant-design/icons";
import { Link } from "react-bootstrap/lib/Navbar";
const { Meta } = Card;
const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize: 20,
};
class All_cafe extends React.Component {
  state = {
    cafe_name: "Ananas",
    cafe_img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  };
  render() {
    return (
      <div className="cafelist_container">
            <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>{" "}
        <div className="cafe_list"> <div className="cafe_card">
              {" "}
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={this.state.cafe_img} />}
                actions={[
                  <div style={{color:'#fff'}}>
                    see cafe details <CoffeeOutlined />
                  </div>,
                ]}
              >
                <Link>{this.state.cafe_name}</Link>
              </Card>
            </div>
            <div className="cafe_card">
              {" "}
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={this.state.cafe_img} />}
                actions={[
                  <div style={{color:'#fff'}}>
                    see cafe details <CoffeeOutlined />
                  </div>,
                ]}
              >
                <Link>{this.state.cafe_name}</Link>
              </Card>
            </div>
          </div>
          <div className="cafe_card">
              {" "}
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={this.state.cafe_img} />}
                actions={[
                  <div style={{color:'#fff'}}>
                    see cafe details <CoffeeOutlined />
                  </div>,
                ]}
              >
                <Link>{this.state.cafe_name}</Link>
              </Card>
            </div>
      </div>
    );
  }
}
export default All_cafe;
