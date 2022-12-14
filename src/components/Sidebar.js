import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faSignOutAlt,
  faTimes,
  faCube,
  faTv,
  faArrowCircleDown,
  faHandPointer,
  faFileArchive,
  faBookMedical,
  faChartLine,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "custom-primary",
      badgeColor = "custom-primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block custom-primary text-black`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to={Routes.Signin.path}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              {/* <NavItem
                title="Volt React"
                link={Routes.Presentation.path}
                image={ReactHero}
              /> */}

              <NavItem
                title="Dashboard"
                link={Routes.DashboardOverview.path}
                icon={faTv}
              />
              <Dropdown.Divider className="my-3 border-indigo" />
              {/* <NavItem
                external
                title="Report"
                link="https://demo.themesberg.com/volt-pro-react/#/messages"
                target="_blank"
                icon={faInbox}
              />
              <NavItem
                title="Transactions"
                icon={faHandHoldingUsd}
                link={Routes.Transactions.path}
              />
              <NavItem
                title="Settings"
                icon={faCog}
                link={Routes.Settings.path}
              />
              <NavItem
                external
                title="Calendar"
                link="https://demo.themesberg.com/volt-pro-react/#/calendar"
                target="_blank"
                badgeText="Pro"
                icon={faCalendarAlt}
              />
              <NavItem
                external
                title="Map"
                link="https://demo.themesberg.com/volt-pro-react/#/map"
                target="_blank"
                badgeText="Pro"
                icon={faMapPin}
              /> */}
              <h6 style={{ color: "red", fontWeight: "bold" }}>NGHI???P V???</h6>
              <NavItem
                title="Danh M???c,C???u H??nh"
                link={Routes.TableProduct.path}
                icon={faCube}
              />
              <CollapsableNavItem
                // eventKey="tables/"
                title="Nh???p H??ng"
                icon={faArrowCircleDown}
              >
                <NavItem
                  title="K??? ho???ch nh???p (ASN)"
                  // link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem>
              <CollapsableNavItem
                // eventKey="tables/"
                title="Xu???t H??ng"
                icon={faHandPointer}
              >
                <NavItem
                  title="K??? ho???ch xu???t kho"
                  // link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />
              <h6 style={{ color: "red", fontWeight: "bold" }}>B??O C??O</h6>
              <CollapsableNavItem
                // eventKey="tables/"
                title="Chi ti???t, L???ch s???"
                icon={faFileArchive}
              >
                <NavItem
                  title="Chi Ti???t H??ng Nh???p"
                  // link={Routes.BootstrapTables.path}
                />
                <NavItem
                  title="Chi Ti???t H??ng Xu???t"
                  // link={Routes.BootstrapTables.path}
                />
                <NavItem
                  title="Chi ti???t kh??c"
                  // link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem>

              <CollapsableNavItem
                // eventKey="tables/"
                title="V???n H??nh"
                icon={faBookMedical}
              >
                <NavItem
                  title="Nh???p kho"
                  // link={Routes.BootstrapTables.path}
                />
                <NavItem
                  title="Xu???t kho"
                  //  link={Routes.BootstrapTables.path}
                />
                <NavItem
                  title="T??nh h??nh nh???p xu???t trong ng??y"
                  // link={Routes.BootstrapTables.path}
                />
                <NavItem
                  title="Handing"
                  // link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem>

              <CollapsableNavItem
                eventKey="tables/"
                title="B??o C??o"
                icon={faChartLine}
              >
                <NavItem
                  title="T???n kho hi???n t???i"
                  link={Routes.BootstrapTables.path}
                />
                <NavItem title="Xu???t nh???p t???n" link={Routes.TableImport.path} />
              </CollapsableNavItem>

              <CollapsableNavItem
                // eventKey="tables/"
                title="Master, Chart Report"
                icon={faChartPie}
              >
                <NavItem
                  title="S???n l?????ng nh???p"
                  // link={Routes.BootstrapTables.path}
                />
                <NavItem
                  title="S???n l?????ng xu???t"
                  // link={Routes.TableImport.path}
                />
              </CollapsableNavItem>

              {/* <NavItem
                external
                title="Plugins"
                link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable"
                target="_blank"
                badgeText="Pro"
                icon={faChartPie}
              /> */}

              <Dropdown.Divider className="my-3 border-indigo" />
              <h6 style={{ color: "red", fontWeight: "bold" }}>QU???N TR???</h6>
              <CollapsableNavItem
                // eventKey="tables/"
                title="T??i kho???n"
                icon={faThLarge}
              >
                <NavItem
                  title="Th??ng Tin Th??nh Vi??n"
                  // link={Routes.BootstrapTables.path}
                />
                <NavItem title="?????i M???t Kh???u" />
                <NavItem title="????ng xu???t" />
                <NavItem title="Nh???t k?? ????ng nh???p c?? nh??n" />
              </CollapsableNavItem>

              {/* <CollapsableNavItem
                eventKey="documentation/"
                title="Getting Started"
                icon={faBook}
              >
                <NavItem title="Dashboard" link={Routes.DocsOverview.path} />
                <NavItem title="Download" link={Routes.DocsDownload.path} />
                <NavItem
                  title="Quick Start"
                  link={Routes.DocsQuickStart.path}
                />
                <NavItem title="License" link={Routes.DocsLicense.path} />
                <NavItem
                  title="Folder Structure"
                  link={Routes.DocsFolderStructure.path}
                />
                <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
              </CollapsableNavItem>
              <CollapsableNavItem
                eventKey="components/"
                title="Components"
                icon={faBoxOpen}
              >
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem
                  external
                  title="Widgets"
                  link="https://demo.themesberg.com/volt-pro-react/#/components/widgets"
                  target="_blank"
                  badgeText="Pro"
                />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem> */}
              {/* <NavItem
                external
                title="Themesberg"
                link="https://themesberg.com"
                target="_blank"
                image={ThemesbergLogo}
              /> */}
              {/* <Button
                as={Link}
                to={Routes.Upgrade.path}
                variant="secondary"
                className="upgrade-to-pro"
              >
                <FontAwesomeIcon icon={faRocket} className="me-1" /> Upgrade to
                Pro
              </Button> */}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
