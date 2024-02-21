import dashboard from './dashboard.jsx';
import pages from './pages.jsx';
import utilities from './utilities.jsx';
import other from './other.jsx';
import profile from '../menu-items/profile.jsx';
import { widget } from './widget.jsx';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, profile, widget, pages, utilities, other]
};
export default menuItems;
