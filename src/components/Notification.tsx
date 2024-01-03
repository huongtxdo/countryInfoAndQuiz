import { Alert } from '@mui/material'

const Notification = ({ message, severity }) =>
  message ? (
    <Alert variant="outlined" severity={severity} style={{ marginBottom: 5 }}>
      {message}
    </Alert>
  ) : (
    <div style={{ height: 48, marginBottom: 5 }}></div>
  )

export default Notification

