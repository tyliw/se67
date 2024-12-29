import { Button, Form, Input, message, Flex, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../services/https";
import { SignInInterface } from "../../interfaces/SignIn";
// import logo from "./../../assets/logo.png";
import "./index.css"
import { useState } from "react";
import Spinner from "../../components/stripe-spinner/Spinner";

function SignInPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const { Title } = Typography;

  const onFinish = async (values: SignInInterface) => {
    setIsLoading(true)
    const res = await SignIn(values);
    if (res.status == 200) {
      messageApi.success("Sign-in successful");
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("page", "dashboard");
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);

      setTimeout(() => {
        setIsLoading(false)
        location.href = "/food-service/login/menu/order";
      }, 2000);
    } else {
      messageApi.error(res.data.error);
    }
  };

  return (
    <div className="login-container" >
      {contextHolder}
      <Flex justify="center" align="center" className="login">
        <div className="card-login">
          <Row className="left-side-container" align={"middle"} justify={"center"} style={{maxWidth:"400px", height: "auto", padding:"24px" }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Title level={3}>Login in to your account</Title>
              {/* <img
                alt="logo"
                style={{ width: "80%", marginBottom:"24px" }}
                src={logo}
                className="images-logo"
              /> */}
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                style={{width:"100%"}}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={isLoading}
                    style={{ width:"100%", borderRadius:"4px", background:"var(--color-theme-main)" }}
                  >
                    {isLoading ? <Spinner/> : "log in"}
                  </Button>
                   {/* Or <a onClick={() => navigate("/signup")}> signup now !</a> */}
                </Form.Item>

                <Form.Item>
                  Don’t have an account yet? <a style={{color:"var(--color-theme-main)"}} onClick={() => navigate("/food-service/signup")}> signup now !</a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
            <div className="right-side-container">
              <img src="https://cdn.pixabay.com/video/2018/11/16/19368-301525727_tiny.jpg" alt="" className="right-side-img"/>
            </div>
          {/* <Row style={{width:"100%", height: "100%" }}>
          </Row> */}
        </div>
      </Flex>
    </div>
  );
}

export default SignInPages;
