import { Alert, AlertColor } from '@mui/material';

interface NotificationProps {
  message: string;
  severity: AlertColor | undefined;
}

const Notification = ({ message, severity }: NotificationProps) =>
  message ? (
    <Alert variant="outlined" severity={severity} style={{ marginBottom: 5 }}>
      {message}
    </Alert>
  ) : (
    <div style={{ height: 48, marginBottom: 5 }}></div>
  );

export default Notification;

