// MenuList/index.jsx

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import MenuItems from '../../../../menu-items'; // Cambia la importación para que sea la función

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const menuItem = MenuItems(); // Llama a la función para obtener el objeto de menú

/*  console.log('menuItem:', menuItem); // para ver el valor completo de menuItem
  console.log('menuItem.items:', menuItem.items); // para ver el valor de items*/

  if (!menuItem.items || !Array.isArray(menuItem.items)) {
    // console.error("menuItem.items debe ser un array en MenuList");
    return (
      <Typography variant="h6" color="error" align="center">
        Error en la configuración de los elementos del menú
      </Typography>
    );
  }

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
