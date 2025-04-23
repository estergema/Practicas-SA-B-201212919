# Sistema de Monitoreo y Logging Centralizado para Microservicios

Este proyecto implementa un sistema completo de monitoreo y logging centralizado para arquitecturas de microservicios utilizando:

- **ELK Stack** (Elasticsearch, Logstash, Kibana) para gestión de logs
- **Prometheus y Grafana** para monitoreo de métricas
- **AlertManager** para gestión de alertas


# Instalación y Configuración de Herramientas de Monitoreo y Registro

## Requisitos Generales

- Sistema Operativo: Ubuntu 20.04 o superior (también se puede adaptar a otras distros).
- Acceso con privilegios de `sudo`.
- Conexión a internet.


##  Prometheus

###  Instalación

```bash
# Crear usuario Prometheus
sudo useradd --no-create-home --shell /bin/false prometheus

# Crear directorios necesarios
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus

# Descargar Prometheus
wget https://github.com/prometheus/prometheus/releases/latest/download/prometheus-2.48.1.linux-amd64.tar.gz
tar xvf prometheus-2.48.1.linux-amd64.tar.gz
cd prometheus-2.48.1.linux-amd64/

# Copiar binarios
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/

# Copiar configuración y consola web
sudo cp -r consoles /etc/prometheus
sudo cp -r console_libraries /etc/prometheus
sudo cp prometheus.yml /etc/prometheus

# Asignar permisos
sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
```

### Configuración

Editar el archivo `/etc/prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

### Ejecutar como servicio

```bash
sudo nano /etc/systemd/system/prometheus.service
```

Contenido:

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
ExecStart=/usr/local/bin/prometheus   --config.file=/etc/prometheus/prometheus.yml   --storage.tsdb.path=/var/lib/prometheus/   --web.console.templates=/etc/prometheus/consoles   --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=default.target
```

```bash
# Activar y arrancar Prometheus
sudo systemctl daemon-reexec
sudo systemctl enable prometheus
sudo systemctl start prometheus
```

---

## Grafana

### Instalación

```bash
# Añadir repositorio
sudo apt install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"

# Añadir clave GPG
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

# Instalar Grafana
sudo apt update
sudo apt install grafana -y
```

### Iniciar Grafana

```bash
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

### Acceder

Abrir en el navegador: `http://localhost:3000`

- Usuario: `admin`
- Contraseña: `admin` (se solicita cambio al ingresar)

---

## ELK Stack

###  Elasticsearch

```bash
# Descargar e instalar
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-8.x.list
sudo apt update
sudo apt install elasticsearch -y
```

#### Configurar

```bash
sudo nano /etc/elasticsearch/elasticsearch.yml
```

Agrega o descomenta:

```yaml
network.host: localhost
http.port: 9200
```

```bash
# Activar servicio
sudo systemctl enable elasticsearch
sudo systemctl start elasticsearch
```

---

###  Logstash

```bash
sudo apt install logstash -y
```

#### Configurar archivo de entrada/salida

```bash
sudo nano /etc/logstash/conf.d/logstash-simple.conf
```

Ejemplo básico:

```conf
input {
  beats {
    port => 5044
  }
}
output {
  elasticsearch {
    hosts => ["localhost:9200"]
  }
  stdout { codec => rubydebug }
}
```

```bash
sudo systemctl enable logstash
sudo systemctl start logstash
```

---

###  Kibana

```bash
sudo apt install kibana -y
```

#### Configurar

```bash
sudo nano /etc/kibana/kibana.yml
```

Edita:

```yaml
server.port: 5601
server.host: "localhost"
elasticsearch.hosts: ["http://localhost:9200"]
```

```bash
sudo systemctl enable kibana
sudo systemctl start kibana
```

### Acceder a Kibana

Ir a `http://localhost:5601` en tu navegador.

---

## Verificación Final

- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`
- Kibana: `http://localhost:5601`
