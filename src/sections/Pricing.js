import React, { useState } from "react"
import PricingItem from "../components/PricingItem"
import Gallery from "../components/Gallery"
import formatPrice from "../libraries/formatPrice"
import { useStaticQuery, graphql } from "gatsby"

// trailer gallery
import trailer from "../images/gallery/trailer/trailer.jpg"
import trailer2 from "../images/gallery/trailer/trailer2.jpg"

// equipment gallery
import pizzaWarmer from "../images/gallery/equipment/pizza-warmer.jpg"
import truckPrepArea from "../images/gallery/kitchen/truck-prep-area.png"
import prepTable from "../images/gallery/equipment/prep-table.jpg"

function Pricing() {
  const { allServicesYaml } = useStaticQuery(graphql`
    {
      allServicesYaml {
        edges {
          node {
            title
            src
          }
        }
      }
    }
  `)

  const [currentPricingDisplay, changePricingDisplay] = useState("kitchen")

  const resetSelectionToIndex = (index, items) => {
    for (let i = index; i < items.length; i++) {
      items[i].toggleAdd(false)
    }
  }

  const totalPrices = [80000, 87000, 93000, 97000]

  const featureStyle = {
    fontSize: "1.5em",
    padding: "20px 12px",
  }

  const [isTruckAdded, toggleTruckAdd] = useState(true)
  const [isEquipmentAdded, toggleEquipmentAdd] = useState(false)
  const [isTrailerAdded, toggleTrailerAdd] = useState(false)
  const [isBusinessAdded, toggleBusinessAdd] = useState(false)

  const [isTruckExpanded, toggleTruckExpand] = useState(false)
  const [isEquipmentExpanded, toggleEquipmentExpand] = useState(false)
  const [isTrailerExpanded, toggleTrailerExpand] = useState(false)
  const [isBusinessExpanded, toggleBusinessExpand] = useState(false)

  const [isDirty, setDirty] = useState(false)
  const [level, setLevel] = useState(0)

  const pricingInfo = [
    {
      headline: "Just the truck",
      summary: "Truck, oven, and everything shown above",
      price: 80000,
      isRequired: true,
      isAdded: isTruckAdded,
      toggleAdd: toggleTruckAdd,
      isExpanded: isTruckExpanded,
      toggleExpand: toggleTruckExpand,
      reference: "truck",
    },
    {
      headline: "Kitchen support equipment",
      summary:
        "Equipment and supplies for running a mobile wood fired pizza business",
      price: 7000,
      isAdded: isEquipmentAdded,
      toggleAdd: toggleEquipmentAdd,
      isExpanded: isEquipmentExpanded,
      toggleExpand: toggleEquipmentExpand,
      reference: "kitchen",
      expandableInfos: [
        {
          label: "Equipment",
          infos: [
            { text: "Spiral dough mixer, Häussler 25 quart" },
            {
              text:
                "Refrigerator – full size stainless steel commercial two-door (Blue Air) with 15 pan dough rack on one side",
            },
            {
              text:
                "Refrigerated prep table (Turbo Air 48” ) with an assortment of half, third, sixth and ninth trays",
            },
            {
              text:
                "Heater/dough proofer with stainless top and shelf (half-size Win-Holt NHP-PD-ECO)",
            },
            {
              text:
                "Pizza warmer, Hatco FDWD-1X, on rolling cart with two shelves",
            },
            { text: "Half baker rack with stainless top" },
          ],
        },
        {
          label: "Accessories",
          infos: [
            { text: "6 sheet pans, full-size" },
            { text: "30 sheet pans, half-size" },
            { text: "12 custom Lloyd pizza pans, 13.5”" },
            { text: "15 pizza pans, 12”" },
            { text: "Pizza screens - 8”, 10”, 12” and 14” sizes" },
            { text: "Wooden peels" },
            { text: "Cutting boards" },
            { text: "Pizza cutters" },
            { text: "Large serving spatulas" },
            { text: "And more!" },
          ],
        },
        {
          label: "Sales equipment",
          description: "The following items are mounted to a portable cart:",
          infos: [
            {
              text:
                "iPad Air (model A1566, 2nd generation) for a POS system of your choice",
            },
            { text: "ShopKeep counter iPad mount and Survivor iPad case" },
            { text: "Credit card reader, Ingenico iCMP" },
            { text: "Cash drawer, APG Vasario" },
            { text: "Broadband router, Verizon 4G LTE" },
            { text: "Receipt printer, Star TSP100" },
          ],
        },
      ],
      images: [
        { original: pizzaWarmer, thumbnail: pizzaWarmer },
        { original: truckPrepArea, thumbnail: truckPrepArea },
        { original: prepTable, thumbnail: prepTable },
      ],
    },
    {
      headline: "Second unit trailer",
      summary:
        "Mobile mini-kitchen that makes any setup more flexible, including supplemental equipment",
      price: 6000,
      isAdded: isTrailerAdded,
      toggleAdd: toggleTrailerAdd,
      isExpanded: isTrailerExpanded,
      toggleExpand: toggleTrailerExpand,
      reference: "trailer",
      description: [
        {
          text:
            "Starting with a 6' x 12' Road Force tandem axle trailer, we installed a wood fired oven and venting system, lighting, refrigeration, a counter with storage cabinets, and a portable hand wash sink.",
        },
        {
          text:
            "When open, the ramp door can become a workspace with included camper jacks. Also included is a remote-controlled winch to assist with moving the oven in and out of trailer.",
        },
      ],
      expandableInfos: [
        {
          label: null,
          infos: [
            {
              jsxWithLink: (
                <span>
                  Wood fired oven,{" "}
                  <a
                    href="https://chicagobrickoven.com/products/cbo-750-mobile?variant=12221428367402"
                    target="_blank"
                  >
                    Chicago Brick Oven CB-750
                  </a>{" "}
                  (currently mounted on the trailer but can also be portable on
                  a cart)
                </span>
              ),
            },
            { text: "Refrigerator/freezer, Sears 13 cubic foot" },
            { text: "Portable hand wash sink with heater, PolyJohn" },
            { text: "Counter with storage cabinets" },
            { text: "6 Camper jacks to make ramp door an extra workspace" },
            {
              text:
                "Wired for 110V power to inside outlets and 12-volt system inside to run winch and lights",
            },
            { text: "12V battery to power lights and winch" },
          ],
        },
      ],
      images: [
        { original: trailer, thumbnail: trailer },
        { original: trailer2, thumbnail: trailer2 },
      ],
    },
    {
      headline: "Business and support extras",
      summary: "Training to make our pizza plus marketing and logo supplies",
      price: 4000,
      isAdded: isBusinessAdded,
      toggleAdd: toggleBusinessAdd,
      isExpanded: isBusinessExpanded,
      toggleExpand: toggleBusinessExpand,
      reference: "business",
      expandableInfos: [
        {
          category: null,
          infos: [
            { text: "CO state registered business name" },
            {
              text:
                "Two weeks of training to learn about the wood fired oven and how to make our delicious pizza",
            },
            { text: "Complete customizable WordPress website" },
            {
              text:
                "Custom EZ-Up canopy shelter, 10” x 10” digitally printed with logo and 4 weight bags",
            },
            {
              text:
                "Picnic table, 6’ collapsible, with bench seats and umbrella",
            },
            { text: "Aprons with embroidered logo" },
          ],
        },
      ],
      images: [],
    },
  ]

  const currentDisplay = pricingInfo.find(
    item => item.reference === currentPricingDisplay
  )

  return (
    <div id="pricing" className="container section">
      <div className="container pricing-section">
        <h1 className="text-center my-6">Pricing</h1>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          Customize your setup!
          <br></br>
          Explore add-ons and pricing:
        </div>
        <h2 className="price-container">
          <span className="price-label">
            {!isDirty ? "BASE" : "YOUR"} PRICE:{" "}
          </span>
          <span className="price">{formatPrice(totalPrices[level])}</span>
        </h2>
        <div className="pricing-items">
          {pricingInfo.map((pkg, i) => (
            <PricingItem
              key={i}
              pkg={pkg}
              level={level}
              setLevel={setLevel}
              isDirty={isDirty}
              setDirty={setDirty}
              isExpanded={pkg.isExpanded}
              toggleExpand={pkg.toggleExpand}
              i={i}
            />
          ))}
        </div>
        <div className="pricing-details">
            <h3>
              {currentDisplay.headline}
            </h3>
          <div className="price-summary">
            <div className="">{currentDisplay.summary}</div>
          </div>
          <div className="expanded-price-info">
            {currentDisplay.description &&
              currentDisplay.description.map((p, i) => {
                return <p key={"p-" + i}>{p.text}</p>
              })}
            {currentDisplay.expandableInfos &&
              currentDisplay.expandableInfos.map((list, i) => {
                return (
                  <div key={"info-" + i}>
                    <h5>{list.label}</h5>
                    {list.description && (
                      <p
                        style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}
                        key={i}
                      >
                        {list.description}
                      </p>
                    )}
                    <ul>
                      {list.infos.map((info, i) => {
                        const subInfos =
                          info.subInfos && info.subInfos.length
                            ? info.subInfos
                            : null
                        return subInfos ? (
                          <div key={info.label + "-" + i}>
                            <li>{info.text || info.jsxWithLink}</li>
                            <ul>
                              {subInfos.map((subInfo, k) => (
                                <li key={"subInfo-" + i + "-" + k}>
                                  {subInfo.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <li key={i}>{info.text || info.jsxWithLink}</li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            {currentDisplay.images && currentDisplay.images.length !== 0 && (
              <Gallery images={currentDisplay.images} thumbnailPosition="right" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing