# DesaCare

## Konfigurasi API Frontend

Untuk local development, buat `frontend/.env.local` dan isi:

```env
VITE_API_URL=http://localhost:5000
```

Saat berjalan di AWS ECS dengan Application Load Balancer, frontend menggunakan fallback `/api` sehingga request API diarahkan melalui load balancer.

Routing load balancer:

```text
/      -> frontend service
/api/* -> backend service
```
