'use client';
          <a
            href="https://www.upwork.com/freelancers/~018465f55a98ea0651"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-green/10 text-green border border-green rounded hover:bg-green/20 transition font-mono text-sm text-center"
          >
            Hire Me on Upwork
          </a>

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-navy/80 backdrop-blur-md border-b border-green/20 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-green">
          <span className="text-white">A</span>M
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lightSlate hover:text-green transition font-mono text-sm relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <a
            href="https://www.upwork.com/freelancers/~018465f55a98ea0651"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green/10 text-green border border-green rounded hover:bg-green/20 transition font-mono text-sm"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-green hover:text-lightSlate transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-navy border-t border-green/20 px-6 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lightSlate hover:text-green transition font-mono text-sm py-2"
            >
              {link.label}
            </Link>
          ))}
          <a
<<<<<<< HEAD
            href="https://www.linkedin.com/in/abdullah-m-4a3b38296/"
=======
            href="https://www.upwork.com/freelancers/~018465f55a98ea0651"
>>>>>>> 1802400 (feat: add GitHub to social links and point navbar Hire Me to Upwork)
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 bg-green/10 text-green border border-green rounded hover:bg-green/20 transition font-mono text-sm text-center"
          >
<<<<<<< HEAD
            Hire Me
=======
            Hire Me on Upwork
>>>>>>> 1802400 (feat: add GitHub to social links and point navbar Hire Me to Upwork)
          </a>
        </motion.div>
      )}
    </nav>
  );
}
