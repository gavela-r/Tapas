FROM php:8.2-apache

# Instalar mysqli
RUN docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli

# Habilitar mod_rewrite (opcional)
RUN a2enmod rewrite

# Copiar el proyecto
COPY . /var/www/html/

# Permisos correctos
RUN chown -R www-data:www-data /var/www/html