import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Form.css";

function LoginForm({ login, setPassword }) {
  return (
    <Form
      className="form"
      style={{
        marginInline: "auto",
      }}
    >
      <h2 className="form-title">Вхід в акаунт</h2>

      <FloatingLabel controlId="floatingPassword" label="Пароль">
        <Form.Control
          type="password"
          // value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>

      <Button
        variant="primary"
        type="submit"
        className="submit-button"
        onClick={() => login()}
      >
        Увійти
      </Button>
    </Form>
  );
}

export default LoginForm;
