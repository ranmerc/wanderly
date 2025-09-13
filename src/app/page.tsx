"use client";

import { useEffect, useRef, useState } from "react";
import "./globals.css";
import posthog from "posthog-js";

type Trip = {
  id: number;
  title: string;
  tag: string;
  metro: string;
  price: string;
  rating: number;
  city: string;
  img: string;
};

const trips: Trip[] = [
  {
    id: 1,
    title: "Goa Oceanfront Villa",
    tag: "beach",
    metro: "Mumbai",
    price: "₹7,999 / night",
    rating: 4.8,
    city: "Goa",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Gokarna Cliff Cabin",
    tag: "beach",
    metro: "Bengaluru",
    price: "₹4,999 / night",
    rating: 4.6,
    city: "Gokarna",
    img: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Alibaug Courtyard Home",
    tag: "near-metro",
    metro: "Mumbai",
    price: "₹5,999 / night",
    rating: 4.7,
    city: "Alibaug",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Panchgani Lake Resort",
    tag: "mountain",
    metro: "Pune",
    price: "₹6,299 / night",
    rating: 4.5,
    city: "Panchgani",
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Mahabalipuram Beach Stay",
    tag: "beach",
    metro: "Chennai",
    price: "₹3,999 / night",
    rating: 4.4,
    city: "Mahabalipuram",
    img: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Coorg Coffee Estate Cottage",
    tag: "mountain",
    metro: "Bengaluru",
    price: "₹3,799 / night",
    rating: 4.6,
    city: "Coorg",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Udaipur Lakeside Haveli",
    tag: "romantic",
    metro: "Ahmedabad",
    price: "₹8,999 / night",
    rating: 4.9,
    city: "Udaipur",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Budget Capsule (Mumbai)",
    tag: "budget",
    metro: "Mumbai",
    price: "₹1,499 / night",
    rating: 4.1,
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HomePage() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Book Your Stay");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const [isNewUI, setIsNewUI] = useState(false);

  useEffect(() => {
    if (posthog.getFeatureFlag("new-ui-appeal") === "new") {
      setIsNewUI(true);
    }
  }, []);

  const filteredTrips = trips.filter((t) => {
    const tagOK = active === "all" || t.tag === active;
    const qOK =
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.city.toLowerCase().includes(query.toLowerCase()) ||
      t.metro.toLowerCase().includes(query.toLowerCase());
    return tagOK && qOK;
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2200);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIdx((i) => (i + 1) % 3);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const openModal = (title: string, id: number | null = null) => {
    setModalTitle(title);
    setBookingId(id);
    setShowModal(true);
  };

  return (
    <div>
      <header className="nav">
        <div className="nav-wrap">
          <div className="logo">
            <i>🌊</i>
            <span>VOYAGEVISTA</span>
          </div>
          {isNewUI && (
            <nav className="links">
              <a href="#search">Search</a>
              <a href="#deals">Deals</a>
              <a href="#popular">Packages</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          )}
          <button
            className="btn ghost"
            onClick={() => openModal("Free Trip Consultation")}
          >
            Request Consultation
          </button>
          <button
            className="btn primary"
            id="signinBtn"
            onClick={() => {
              alert("Sign-in coming soon!");
              posthog.capture("button_clicked", {
                variant: isNewUI ? "new" : "control",
              });
            }}
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-grad" aria-hidden="true" />
        <div className="hero-wrap">
          <h1>Shaping Coastal Gateways’ Journeys Through Design</h1>
          <p className="sub1">
            Boutique operator for premium weekend packages near metros —
            crafted, curated, and conversion-ready.
          </p>
          <div className="tagline">
            “Weekend Luxury, One Click Away.” — Coastal Gateways Pvt. Ltd.
          </div>
          <div className="hero-cta">
            <button
              className="btn primary"
              onClick={() =>
                document
                  .getElementById("popular")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Packages
            </button>
            <button
              className="btn ghost"
              onClick={() => showToast("Playing teaser…")}
            >
              Watch Teaser
            </button>
          </div>

          {/* Search */}
          {isNewUI && (
            <div id="search" className="hero-card">
              <div className="grid search-grid">
                <div className="field">
                  <span>🔎</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Where to? (Goa, Gokarna, Alibaug…)"
                  />
                </div>
                <div className="field">
                  <span>📅</span>
                  <input type="date" />
                </div>
                <div className="field">
                  <span>📅</span>
                  <input type="date" />
                </div>
                <div className="field">
                  <span>👤</span>
                  <select defaultValue="2 guests">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4+ guests</option>
                  </select>
                </div>
                <button
                  className="btn primary"
                  onClick={() => showToast("Search updated")}
                >
                  Search
                </button>
              </div>
              <div className="chipbar">
                {[
                  "all",
                  "beach",
                  "mountain",
                  "near-metro",
                  "romantic",
                  "budget",
                ].map((chip) => (
                  <button
                    key={chip}
                    className={`chip ${active === chip ? "active" : ""}`}
                    onClick={() => setActive(chip)}
                  >
                    {chip.charAt(0).toUpperCase() +
                      chip.slice(1).replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Deals carousel */}
      {isNewUI && (
        <section id="deals" className="section">
          <h2 className="h2">Hot Deals This Week</h2>
          <p className="note">
            Limited-time savings on handpicked short-breaks.
          </p>
          <div className="carousel">
            <div
              className="slides"
              style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
            >
              {[
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
              ].map((src, i) => (
                <div className="slide" key={i}>
                  <img src={src} alt={`slide-${i}`} />
                </div>
              ))}
            </div>
            <button
              className="cbtn left"
              onClick={() => setCarouselIdx((i) => (i - 1 + 3) % 3)}
            >
              ◀
            </button>
            <button
              className="cbtn right"
              onClick={() => setCarouselIdx((i) => (i + 1) % 3)}
            >
              ▶
            </button>
          </div>
        </section>
      )}

      {/* Cards */}
      <section id="popular" className="section">
        <h2 className="h2">Curated Weekenders</h2>
        <p className="note">
          Discovery → Consultation → Booking. Seamless and friction-free.
        </p>
        <div
          className="cards"
          style={{
            gridTemplateColumns: !isNewUI ? "1fr 1fr" : "",
          }}
        >
          {filteredTrips.length ? (
            filteredTrips.map((t) => (
              <article className="card" key={t.id}>
                <div className="card-img">
                  <img src={t.img} alt={t.title} />
                </div>
                <div className="card-body">
                  <div className="row">
                    <strong>{t.title}</strong>
                    <span className="price">{t.price}</span>
                  </div>
                  <div className="row">
                    <span className="meta">
                      📍 {t.city} • Near {t.metro} • ⭐ {t.rating}
                    </span>
                    <span className="meta">#{t.tag}</span>
                  </div>
                  <div className="actions">
                    <button
                      className="ibtn"
                      onClick={(e) => {
                        e.currentTarget.classList.toggle("fav");
                        showToast(
                          e.currentTarget.classList.contains("fav")
                            ? "Added to favorites"
                            : "Removed from favorites"
                        );
                      }}
                    >
                      ❤️ Favorite
                    </button>
                    <button
                      className="ibtn"
                      onClick={() =>
                        showToast(
                          `${t.title}: curated stay with flexible cancellation & verified host.`
                        )
                      }
                    >
                      ℹ️ Details
                    </button>
                    <button
                      className="book"
                      id="bookBtn"
                      onClick={() => {
                        alert("Booked");
                        posthog.capture("button_clicked", {
                          variant: isNewUI ? "new" : "control",
                        });
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="note">No results. Try another filter or query.</p>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2 className="h2">Coastal Gateways: At a Crossroads</h2>
        <div className="about">
          <div className="pill">
            <h3>Who We Are</h3>
            <p className="note">
              <strong>Coastal Gateways Pvt. Ltd.</strong> — India’s most trusted
              curator of premium short-break experiences.
            </p>
            <p>
              <strong>Vision:</strong> Be India’s most trusted curator of
              premium short-break experiences.
            </p>
            <p>
              <strong>Mission:</strong> Deliver seamless discovery-to-booking
              journeys by combining authentic stays, curated itineraries, and
              friction-free digital experiences.
            </p>
          </div>
          <div className="pill">
            <h3>Business Overview</h3>
            <ul>
              <li>Boutique operator near metros.</li>
              <li>
                85% leads originate on website → Consultation → Booking
                (commission + package margin).
              </li>
              <li>
                <strong>Current challenge:</strong> Inquiry conversions
                underperform vs targets.
              </li>
            </ul>
            <p className="note">
              <em>Dilemma:</em> Visitors are discouraged by layout; trust
              elements & CTA placement were missing. This site fixes that with
              visible CTAs, social proof, and simpler flows.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section trust">
        <div className="pill">
          <h3>Happy Travellers</h3>
          <p className="stars">★★★★★</p>
          <blockquote>
            “Perfect weekend escape! Booking was effortless and the itinerary
            was spot on.” — A. Mehta
          </blockquote>
          <blockquote>
            “Loved the curated villas. Will book again!” — R. Sen
          </blockquote>
        </div>
        <div className="pill">
          <h3>Why Trust Us</h3>
          <ul>
            <li>Secure payments • Clear cancellation</li>
            <li>Verified partners • Real photos</li>
            <li>Dedicated trip designer</li>
          </ul>
          <button
            className="btn primary"
            onClick={() => openModal("Free Trip Consultation")}
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="lead">
          <input id="leadName" placeholder="Your name" />
          <input id="leadEmail" placeholder="Email" />
          <input id="leadPhone" placeholder="Phone" />
          <button
            className="btn primary"
            onClick={() => showToast("Request received!")}
          >
            Request Callback
          </button>
        </div>
        <p className="note">
          We’ll respond within business hours. Zero spam. Only trip magic.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <div className="foot">
          <div>
            © {new Date().getFullYear()} VOYAGEVISTA · Coastal Gateways Pvt.
            Ltd.
          </div>
          <div>Terms · Privacy · Support</div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3>{modalTitle}</h3>
              <button className="close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
                const t = trips.find((x) => x.id === bookingId);
                showToast(
                  `Thanks! ${
                    t ? t.title + " — " : ""
                  } Our team will confirm by email.`
                );
              }}
            >
              <input placeholder="Full name" required />
              <input type="email" placeholder="Email" required />
              <div
                className="row"
                style={{ gap: "10px", justifyContent: "stretch" }}
              >
                <input type="date" required />
                <input type="date" required />
              </div>
              <select>
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
              <textarea rows={3} placeholder="Anything specific?" />
              <div className="row" style={{ justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn primary" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && <div className="toast show">{toastMsg}</div>}
    </div>
  );
}
