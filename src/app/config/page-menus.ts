var pageMenus = [{
  'icon': 'fa fa-th-large',
  'title': 'Carrito',
  'url': 'home'

},
{
  'icon': 'fa fa-th-large',
  'title': 'Catálogos',
  'url': '',
  'caret': 'true',
  'submenu': [{
    'url': 'catalogo/clientes',
    'title': 'Clientes'
  },{
    'url': 'catalogo/articulos',
    'title': 'Articulos'
  },{
    'url': 'catalogo/tiendas',
    'title': 'Tiendas'
  }]
}];

export default pageMenus;
