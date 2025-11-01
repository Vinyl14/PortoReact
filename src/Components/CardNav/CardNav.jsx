import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

const CardNav = ({
                   logo,
                   logoAlt = 'Logo',
                   items,
                   className = '',
                   ease = 'power3.out',
                   baseColor = '#fff',
                   menuColor,
                   buttonBgColor,
                   buttonTextColor,
                   activeSection
                 }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  // Simpan state di sessionStorage agar bertahan saat navigasi
  useLayoutEffect(() => {
    const savedState = sessionStorage.getItem('cardNavExpanded');
    if (savedState === 'true') {
      setIsExpanded(true);
      setIsHamburgerOpen(true);
    }
  }, []);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight;
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    // Jika state sudah expanded, jalankan animasi
    if (isExpanded) {
      tl.play(0);
    }

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items, isExpanded]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      sessionStorage.setItem('cardNavExpanded', 'true');
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => {
        setIsExpanded(false);
        sessionStorage.setItem('cardNavExpanded', 'false');
        tl.eventCallback('onReverseComplete', null);
      });
      tl.reverse();
    }
  };

  const handleNavItemClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation(); // STOP EVENT BUBBLING

    const targetId = item.label.toLowerCase();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update URL hash tanpa reload page
      window.history.pushState(null, null, `#${targetId}`);
    }

    // JANGAN tutup menu - biarkan tetap terbuka
  };

  const handleCardLinkClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation(); // STOP EVENT BUBBLING

    if (link.href) {
      if (link.href.startsWith('http')) {
        window.open(link.href, '_blank');
      } else {
        // Untuk link internal, gunakan navigate atau window.location
        window.location.href = link.href;
      }
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
      <div className={`card-nav-container ${className}`}>
        <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
          <div className="card-nav-top">
            <div
                className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                role="button"
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                tabIndex={0}
                style={{ color: menuColor || '#000' }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <div className="logo-container">
              <img src={logo} alt={logoAlt} className="logo" />
            </div>

            <button
                type="button"
                className="card-nav-cta-button"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                href="https://www.linkedin.com/in/alvinlinardi/"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click on button from closing
                  window.open('https://www.linkedin.com/in/alvinlinardi/', '_blank');
                }}
            >
              Get Started
            </button>
          </div>

          <div className="card-nav-content" aria-hidden={!isExpanded}>
            {(items || []).slice(0, 3).map((item, idx) => {
              const isActive = activeSection === item.label.toLowerCase();

              return (
                  <div
                      key={`${item.label}-${idx}`}
                      className={`nav-card ${isActive ? 'active-nav-card' : ''}`}
                      ref={setCardRef(idx)}
                      style={{ backgroundColor: item.bgColor, color: item.textColor }}
                      onClick={(e) => e.stopPropagation()} // Prevent click on card from closing
                  >
                    <a
                        href={`#${item.label.toLowerCase()}`}
                        className="nav-card-label"
                        onClick={(e) => handleNavItemClick(e, item)}
                    >
                      {item.label}
                    </a>
                    <div className="nav-card-links">
                      {item.links?.map((lnk, i) => (
                          <a
                              key={`${lnk.label}-${i}`}
                              className="nav-card-link"
                              href={lnk.href}
                              aria-label={lnk.ariaLabel}
                              onClick={(e) => handleCardLinkClick(e, lnk)}
                          >
                            <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                            {lnk.label}
                          </a>
                      ))}
                    </div>
                  </div>
              );
            })}
          </div>
        </nav>
      </div>
  );
};

export default CardNav;