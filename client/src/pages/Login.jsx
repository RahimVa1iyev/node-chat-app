import { useContext } from "react"
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
    const { updateLogininfo, loginUser, loginError, loginInfo, isLoginLoading } = useContext(AuthContext)
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row style={
                    {
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: "10%"
                    }
                }>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <Form.Control type="email" placeholder="Email" onChange={(e) => updateLogininfo({ ...loginInfo, email: e.target.value })} />
                            <Form.Control type="password" placeholder="Password" onChange={(e) => updateLogininfo({ ...loginInfo, password: e.target.value })} />
                            <Button variant="primary" type="submit">
                                Login
                            </Button>

                            {
                                loginError &&
                                <Alert variant="danger" >
                                    <p>{loginError?.message}</p>
                                </Alert>
                            }

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Login