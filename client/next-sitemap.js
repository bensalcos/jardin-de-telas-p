module.exports = {
  siteUrl: "https://jardindetelas.bensalcos.com", // Reemplaza con tu dominio
  generateRobotsTxt: true, // Opcional, genera un robots.txt automáticamente
  changefreq: "weekly", // Frecuencia de actualización del sitio
  priority: 0.7, // Prioridad de las páginas (de 0 a 1)
  sitemapSize: 5000, // Máximo número de URLs por archivo sitemap
  exclude: ["/admin", "/auth"], // Rutas a excluir del sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://jardindetelas.bensalcos.com/sitemap.xml", // Ruta al sitemap
    ],
  },
};
