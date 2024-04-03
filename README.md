# Headscale-UI

Headscale-UI is a web interface for Headscale, crafted using React and Material UI.

## Installation

Currently, this project is deployed as a static site. Download the pre-built `headscale-ui` package from [Actions](https://github.com/Arispex/headscale-ui/actions). It can be hosted using any preferred web server, such as Caddy, Nginx, or Apache.

### Example Configuration for Caddy

```
:6213 {
    handle /api* {
        reverse_proxy http://localhost:8080 {
            header_up Host {http.reverse_proxy.upstream.hostport}
        }
    }

    handle {
        root * /root/headscale-ui
        try_files {path} /index.html
        file_server
    }
}
```

Replace `/root/headscale-ui` with your headscale-ui directory path.

Replace `http://localhost:8080` with your Headscale server address.