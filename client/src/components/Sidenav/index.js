import React from 'react';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { MdExpandMore } from 'react-icons/md';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
    SidebarFooter
} from 'react-pro-sidebar';
import './styles.scss';


function Sidenav() {
  const imgStyle = {
    height: "50%"
  }

    return (
<ProSidebar>
  <div className="sidebar-container">
    <div className="sidebar-inner">
      <div className="sidebar-layout">
        <SidebarHeader>
          <div className="header">
            <h3>CooKit</h3>
            <hr/>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <SubMenu title="" icon={MdExpandMore}>
                    <MenuItem>Discover</MenuItem>
              <MenuItem>Search</MenuItem>
              <MenuItem>My Kit</MenuItem>
                    <MenuItem>Shopping List</MenuItem>
                    <MenuItem>Meal Planner</MenuItem>
            </SubMenu>
                </Menu>
      {/* <img src={require('./images/sidebar-bg-img.jpg').default} style={imgStyle} alt="sidebar-background" class="sidebar-bg" /> */}
        </SidebarContent>
              <SidebarFooter>
              <Menu>
            <SubMenu icon={MdExpandMore}>
              <MenuItem>Settings</MenuItem>
                    <MenuItem>Login/Logout</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarFooter>
      </div>
          </div>
  </div>
</ProSidebar>
    )
   

    // return (
    //     <AppBar position="fixed" color="primary" sx={{ right: 'auto', left: 0 }}>
    //     <Toolbar>
    //       <IconButton color="inherit" aria-label="open drawer">
    //         <MdMenu />
    //             </IconButton>
                
    //       <Box sx={{ flexGrow: 1 }} />
    //       <IconButton color="inherit">
    //         <MdSearch />
    //             </IconButton>
    //             <IconButton>
    //                 <MdClose/>
    //             </IconButton>
    //     </Toolbar>
    //   </AppBar>
    // )
}

export default Sidenav;