import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";

const ProfileAdress = ({ user }) => {
  const initialFormData = {
    name: user.address ? user.address?.name : "",
    phone: user.address ? user.address?.phone : "",
    city: user.address ? user.address?.city : "",
    region: user.address ? user.address?.region : "",
    street: user.address ? user.address?.street : "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [newAddress, setNewAddress] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    city: "",
    region: "",
    street: "",
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

  const dispatch = useDispatch();

  const validateClient = () => {
    if (!formData.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Veuillez saisir votre nom et prénom.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: "",
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
    if (!formData.street) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        street: "Veuillez saisir votre adresse.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      street: "",
    }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isClientValid = validateClient();
    const isPhoneValid = validatePhone();
    const isCityValid = validateCity();
    const isAddressValid = validateAddress();

    if (isClientValid && isPhoneValid && isCityValid && isAddressValid) {
      const dataResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, address: formData }),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        dispatch(setUserDetails(dataApi.data));
        setNewAddress(false);
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
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

    const isFormSameAsInitial = Object.keys(initialFormData).every(
      (key) => updatedFormData[key] === initialFormData[key]
    );

    setNewAddress(!isFormSameAsInitial);
  };

  const filteredRegions = formData.city ? regionsData[formData.city] : [];

  return (
    <div className="w-full lg:col-span-8 col-span-1">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="lg:text-2xl text-lg font-semibold mb-4 text-left">
          Mon adresse
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom et Prénom:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
              name="street"
              id="street"
              value={formData.street}
              onChange={handleChange}
              className="mt-1 max-h-24 min-h-24 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600"
              rows="3"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          <div className="flex flex-row gap-3 w-full justify-end">
            <button
              type="submit"
              className={`bg-green-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full mx-auto block mt-6 transition-all ${
                newAddress
                  ? "hover:bg-green-700 hover:scale-110"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!newAddress}
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileAdress;
