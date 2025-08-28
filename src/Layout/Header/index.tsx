import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, NavLink, Row } from "reactstrap";
import { Href } from "../../Constant";
import { RouteList } from "../../Constant/RouteList";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { logout } from "../../ReduxToolkit/Slice/AuthSlice";
import { toggleSidebar } from "../../ReduxToolkit/Slice/LayoutSlice";
import { dynamicImage } from "../../Utils";
import { Maximize2 } from "iconsax-react";
import { MenuList } from "../../Data/SidebarMenuList";

const Header = () => {
  const { sideBarToggle } = useAppSelector((state) => state.layout);
  const { user } = useAppSelector((state) => state.auth);
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) document.documentElement.requestFullscreen();
    else document?.exitFullscreen();
  };
  const dispatch = useAppDispatch();

  return (
    <div className={`page-header ${sideBarToggle ? "close_icon" : ""}`}>
      <Row className="header-wrapper m-0">
        <Col xl="3" lg="2" className="header-logo-wrapper p-0 col-auto">
          <div className="logo-wrapper">
            <Link to={RouteList.Dashboard}>
              <Image className="img-fluid for-light" src={user?.user?.image ?? dynamicImage(`logo/logo.png`)} alt="" />
            </Link>
          </div>
          <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
            <SvgIcon className="sidebar-toggle" iconId="stroke-animation" />
          </div>
        </Col>
        <Col xl="6" lg="8" className="d-none d-lg-block">
          <div className="left-header p-0 justify-content-center">
            <div className="left-menu-header">
              <ul className="header-left">
                {MenuList.map((mainMenu, index) => (
                  <li className={`onhover-dropdown ${index === 4 ? " p-0" : ""}`} key={index}>
                    <span className="f-w-700"><Link to={mainMenu.url} >{mainMenu.title}</Link></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col xs="auto" xl="3" lg="2" sm="5" className="nav-right box-col-6 pull-right right-header p-0 ms-auto">
          <ul className="nav-menus">
            {/* <li onClick={() => fullScreenHandler(!fullScreen)}>
              <NavLink href={Href}>
                <Maximize2 />
              </NavLink>
            </li> */}
            <li className="profile-nav onhover-dropdown p-0 m-0">
              <div className="d-flex profile-media align-items-center">
                <Image className="b-r-6 img-40" src={user?.user?.profilePhoto ? user?.user?.profilePhoto : dynamicImage(`user/user.png`)} alt="profile" />
                <div className="flex-grow-1">
                  <span>
                    {user?.user?.firstName} {user?.user?.lastName}
                  </span>
                  <p className="mb-0 text-capitalize">
                    {user?.user?.email}
                    <SvgIcon iconId="header-arrow-down" />
                  </p>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div">
                <li>
                  <Link to={RouteList.Setting}>
                    <span>Setting</span>
                  </Link>
                </li>
                <li>
                  <Link to={RouteList.ChangePassword}>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link to={RouteList.AboutUs}>
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to={RouteList.PrivacyPolicy}>
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link to={RouteList.TermsAndConditions}>
                    <span>Terms & Condition</span>
                  </Link>
                </li>
                <li onClick={() => dispatch(logout())}>
                  <Link to={Href}>
                    <span>LogOut</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
