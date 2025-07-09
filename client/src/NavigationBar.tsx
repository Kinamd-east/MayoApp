import { useState, useEffect } from "react";
import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const NavigationBar = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Projects",
      link: "#projects",
    },
  ];
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, ready, authenticated } = usePrivy();
  const [userId, setUserId] = useState("");

  const { initOAuth } = useLoginWithOAuth({
    onComplete: async ({ user, isNewUser }) => {
      console.log("✅ Logged in:", user);

      if (isNewUser) {
        // 1. Save user to Firestore
        console.log("This will be saved to the database", user);

        // 2. Send to backend
        try {
          const res = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // credentials: "include", if using cookies
            body: JSON.stringify({
              id: user?.id,
              linkedAccounts: user?.linkedAccounts,
              twitterName: user?.twitter?.name,
              twitterUsername: user?.twitter?.username,
              twitterId: user?.twitter?.subject,
              twitterPfp: user?.twitter?.profilePictureUrl,
              createdAt: user?.createdAt,
            }),
          });

          const data = await res.json();
          console.log("✅ Backend response:", data);
        } catch (error) {
          console.error("❌ Failed to send to backend:", error);
        }
      }
    },
    onError: (error) => {
      console.error("❌ Login failed:", error);
    },
  });

  useEffect(() => {
    if (ready && user?.id) {
      const newUserId = user.id.replace("did:privy:", "");
      setUserId(newUserId);
    }
  }, [ready, user]);

  const profileRedirect = () => {
    setIsMobileMenuOpen(false);
    navigate(`/profile/${userId}`);
  };

  const twitterLoginRedirect = () => {
    initOAuth({ provider: "twitter" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full bg-white">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {ready ? (
              authenticated ? (
                <NavbarButton
                  variant="secondary"
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  Profile
                </NavbarButton>
              ) : (
                <NavbarButton
                  variant="primary"
                  onClick={() => initOAuth({ provider: "twitter" })}
                >
                  Log in with Twitter
                </NavbarButton>
              )
            ) : (
              <NavbarButton variant="primary" disabled>
                Loading...
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {ready ? (
                authenticated ? (
                  <NavbarButton
                    onClick={profileRedirect}
                    variant="primary"
                    className="w-full"
                  >
                    Profile
                  </NavbarButton>
                ) : (
                  <NavbarButton
                    onClick={twitterLoginRedirect}
                    variant="primary"
                    className="w-full"
                  >
                    Log in with Twitter
                  </NavbarButton>
                )
              ) : (
                <NavbarButton variant="primary" className="w-full" disabled>
                  Loading...
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
};

export default NavigationBar;
