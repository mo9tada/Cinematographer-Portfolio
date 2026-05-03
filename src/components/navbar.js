'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
    const pathname = usePathname();
    const navItems = [
        { path: '/', label: 'Portfolio' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <motion.nav 
            className="Navbar glass"
            initial={{ y: -100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        >
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <div key={item.path} className="nav-item">
                    <Link 
                      href={item.path} 
                      className={isActive ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="nav-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                </div>
              );
            })}
        </motion.nav>
    );
}