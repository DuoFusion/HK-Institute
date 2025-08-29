import { Link } from "react-router-dom";
import { RouteList } from "../../Constant/RouteList";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { toggleSidebar } from "../../ReduxToolkit/Slice/LayoutSlice";
import { dynamicImage } from "../../Utils";
import MenuList from "./MenuList";

const Sidebar = () => {
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  const dispatch = useAppDispatch();
  return (
    <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`} data-layout="stroke-svg">
      <div>
        <div className="logo-wrapper">
          <Link to={RouteList.Dashboard}>
            {/* <Image className="img-fluid for-light" src={dynamicImage(`logo/logo.png`)} alt="" /> */}
            <h2>HK Course</h2>
          </Link>
          <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
            <SvgIcon className="sidebar-toggle" iconId="toggle-icon" />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={RouteList.Dashboard}>
            <h2>HK</h2>
            {/* <Image className="img-fluid" src={dynamicImage(`logo/logo-icon.png`)} alt="" /> */}
          </Link>
        </div>
        <nav className="sidebar-main">
          <div id="sidebar-menu">
            <ul className="sidebar-links custom-scrollbar" id="simple-bar">
              <div className="simplebar-wrapper">
                <div className="simplebar-mask">
                  <div className="simplebar-offset">
                    <div className="simplebar-content-wrapper">
                      <div className="simplebar-content">
                        <li className="back-btn">
                          <Link to={RouteList.Dashboard}>
                            <Image className="img-fluid" src={dynamicImage(`logo/logo-icon.png`)} alt="" />
                          </Link>
                          <div className="mobile-back text-end">
                            <span>Back </span>
                            <i className="fa fa-angle-right ps-2" />
                          </div>
                        </li>
                        {/* <li className={`pin-title sidebar-main-title ${pinedMenu.length > 0 ? "show" : ""} `}>
                            <div>
                              <h6>Pinned</h6>
                            </div>
                          </li> */}
                        <MenuList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
