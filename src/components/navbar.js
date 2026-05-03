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
            style={{ 
              borderRadius: '50px',
              padding: '10px 20px',
              background: 'rgba(10, 10, 15, 0.4)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
             }}
        >
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <div key={item.path} className="nav-item" style={{ position: 'relative', margin: '0 10px' }}>
                    <Link 
                      href={item.path} 
                      className={isActive ? 'active' : ''}
                      style={{ padding: '8px 16px', display: 'inline-block' }}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: 'var(--accent)',
                          borderRadius: '2px'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                </div>
              );
            })}
        </motion.nav>
    );
}