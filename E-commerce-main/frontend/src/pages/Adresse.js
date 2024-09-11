import React, { useContext, useEffect, useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import IconCheckCircleFill from "../icons/check";
import IconArrowBackOutline from "../icons/back";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Context from "../context";

const Adresse = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);

  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    city: "",
    region: "",
    address: "",
  });

  const [passOrder, setPassOrder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [newAddress, setNewAddress] = useState(false);
  const [errors, setErrors] = useState({
    client: "",
    phone: "",
    city: "",
    region: "",
    address: "",
  });

  const villesTunisiennes = [
    "Tunis",
    "Ariana",
    "Ben Arous",
    "Manouba",
    "Nabeul",
    "Zaghouan",
    "Bizerte",
    "Béja",
    "Jendouba",
    "Kef",
    "Siliana",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Sfax",
    "Kairouan",
    "Kasserine",
    "Sidi Bouzid",
    "Gabès",
    "Médenine",
    "Tataouine",
    "Gafsa",
    "Tozeur",
    "Kébili",
  ];

  const regionsData = {
    Tunis: ["Centre-ville", "Lac 1", "Lac 2", "Marsa", "Gammarth", "Carthage"],
    Ariana: ["Raoued", "Soukra", "Ariana Ville", "Borj Louzir", "Ennasr"],
    "Ben Arous": ["Hammam Lif", "Rades", "Mourouj", "Fouchana", "Ezzahra"],
    Manouba: ["Mannouba Ville", "Douar Hicher", "Oued Ellil", "Tebourba"],
    Nabeul: ["Nabeul", "Hammamet", "Korba", "Kelibia", "Dar Chaabane"],
    Zaghouan: ["Zaghouan", "Zriba", "Saouaf", "El Fahs", "Nadhour"],
    Bizerte: ["Bizerte", "Menzel Bourguiba", "Mateur", "Ras Jebel"],
    Béja: ["Béja", "Medjez el-Bab", "Nefza"],
    Jendouba: ["Jendouba", "Tabarka"],
    Kef: ["Kef", "Dahmani"],
    Siliana: ["Siliana", "Makthar"],
    Sousse: ["Sousse", "Msaken"],
    Monastir: ["Monastir", "Jemmal", "Sahline"],
    Mahdia: [
      "Mahdia",
      "Ksour Essaf",
      "El Jem",
      "La Chebba",
      "Sidi Alouane",
      "Boumerdès",
      "Mellouleche",
      "Souassi",
      "Chorbane",
      "Ouled Chamek",
      "Hbira",
    ],
    Sfax: ["Sfax", "Mahres", "Kerkennah"],
    Kairouan: ["Kairouan", "Haffouz"],
    Kasserine: ["Kasserine", "Sbeitla"],
    "Sidi Bouzid": ["Sidi Bouzid", "Meknassy"],
    Gabès: ["Gabès", "Matmata"],
    Médenine: ["Médenine", "Djerba"],
    Tataouine: ["Tataouine", "Remada"],
    Gafsa: ["Gafsa", "Moularès"],
    Tozeur: ["Tozeur", "Nefta"],
    Kébili: ["Kébili", "Douz"],
  };

  const validateClient = () => {
    if (!formData.client) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        client: "Veuillez saisir votre nom et prénom.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      client: "",
    }));
    return true;
  };

  const validatePhone = () => {
    const phoneNumberPattern = /^(\+216)?\d{8}$/;
    if (!formData.phone || !phoneNumberPattern.test(formData.phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Veuillez saisir un numéro de téléphone valide (+216XXXXXXXX).",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: "",
    }));
    return true;
  };

  const validateCity = () => {
    if (!formData.city) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        city: "Veuillez sélectionner une ville.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      city: "",
    }));
    return true;
  };

  const validateAddress = () => {
    if (!formData.address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Veuillez saisir votre adresse.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      address: "",
    }));
    return true;
  };

  const handleSubmit = async () => {
    const isClientValid = validateClient();
    const isPhoneValid = validatePhone();
    const isCityValid = validateCity();
    const isAddressValid = validateAddress();

    if (isClientValid && isPhoneValid && isCityValid && isAddressValid) {
      const response = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          products: data,
          name: user?.name,
          total: totalWithDelivery,
          status: "En attente",
          address: formData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Network response was not ok");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("La commande est passé");
        result.data.products.map((product) => {
          fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              _id: product._id,
            }),
          });
        });
        navigate("/");
        fetchUserAddToCart();
      } else {
        toast.error("Un error se produit");
      }
    } else {
      console.log(
        "Le formulaire contient des erreurs. Veuillez corriger les champs."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    const isFormSameAsInitial = Object.keys(formData).every(
      (key) => updatedFormData[key] === formData[key]
    );

    setNewAddress(!isFormSameAsInitial);
  };

  const filteredRegions = formData.city ? regionsData[formData.city] : [];

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  const deliveryFee = 8;
  const totalWithDelivery = totalPrice + deliveryFee;

  useEffect(() => {
    if (user) {
      setFormData({
        client: user?.address?.name,
        phone: user?.address?.phone,
        city: user?.address?.city,
        region: user?.address?.region,
        address: user?.address?.street,
      });
    }
  }, [user]);

  return (
    <div className="container mx-auto grid lg:grid-cols-12 grid-cols-1 lg:gap-24 p-4 my-3 justify-items-center gap-16">
      <div className="w-full lg:col-span-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-left">Mon adresse</h1>
          {!newAddress && (
            <div className="flex flex-row gap-2 items-center my-3 text-sm font-medium text-gray-900">
              <IconCheckCircleFill className="text-green-600 h-5 w-5" />
              Mon adresse
            </div>
          )}
          <form className="space-y-4">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="client"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom et Prénom:
                </label>
                <input
                  type="text"
                  name="client"
                  id="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
                {errors.client && (
                  <p className="text-red-500 text-sm mt-1">{errors.client}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Téléphone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                  placeholder="+216XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ville:
                </label>
                <select
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">Sélectionner une ville</option>
                  {villesTunisiennes.map((ville, index) => (
                    <option key={index} value={ville}>
                      {ville}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Région:
                </label>
                <select
                  name="region"
                  id="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">Sélectionner une région</option>
                  {filteredRegions.length > 0 ? (
                    filteredRegions.map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))
                  ) : (
                    <option value="">Aucune région disponible</option>
                  )}
                </select>
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">{errors.region}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse Exacte:
              </label>
              <textarea
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 max-h-24 min-h-24 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
                rows="3"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                defaultChecked
                onChange={(event) => {
                  setPassOrder(event.target.checked);
                }}
                className="w-4 h-4 accent-green-600 bg-green-100 border-green-600 rounded"
              />
              <label
                htmlFor="vehicle3"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                J'accepte les conditions
              </label>
            </div>
            <div className="flex flex-row gap-3 w-full justify-end">
              <Link to="/Cart">
                <button
                  type="button"
                  className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-full font-semibold flex flex-row gap-3 items-center"
                >
                  <IconArrowBackOutline /> <span>Retour</span>
                </button>
              </Link>
              {/* <button
                type="submit"
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full font-semibold disabled:bg-gray-400"
                disabled={!newAddress}
              >
                Ajouter
              </button> */}
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 lg:mt-0 w-full max-w-sm lg:col-span-4">
        {loading ? (
          <div className="h-36 bg-slate-200 shadow-md animate-pulse" />
        ) : (
          <div className="shadow-md rounded-lg bg-white">
            <h2 className="text-white bg-gray-400 px-4 py-1">Summary</h2>
            <div className="py-2">
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p className="font-normal">Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p className="font-normal">Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p className="font-normal">Delivery Fee</p>
                <p>{displayINRCurrency(deliveryFee)}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p className="font-normal">Total with Delivery</p>
                <p className="font-bold">
                  {displayINRCurrency(totalWithDelivery)}
                </p>
              </div>
            </div>
            <Link to="/Adresse">
              <button
                className="bg-green-600 p-2 text-white w-full mt-2 disabled:bg-gray-400 "
                disabled={!passOrder}
                onClick={handleSubmit}
              >
                Passer le commande
              </button>
            </Link>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default Adresse;