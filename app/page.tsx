"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [fromLanguage, setFromLanguage] = useState("Amharic");
  const [toLanguage, setToLanguage] = useState("English");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const languages = ["English", "Amharic"];

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const requestPayload = {
        text: inputText,
        to: toLanguage === "English" ? "en" : "am",
      };
  
      const response = await axios.post(
        "https://amh-to-eng-translation-go.onrender.com/translate",
        requestPayload
      );
  
      if (response.data.status) {
        setTranslatedText(response.data.translatedText);
      } else {
        alert("Translation failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during translation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 text-gray-800">
      <header className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-teal-600 font-extrabold text-3xl">Translate</div>
        <div className="space-x-6">
          <button className="text-teal-600 hover:text-teal-800 font-medium transition">Log in</button>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">Sign up</button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-10">
        <div className="max-w-lg space-y-6 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-center leading-tight">
            Get A Quick, Elegant <span className="text-teal-600">Translation</span>
          </h1>
          <form className="space-y-6" onSubmit={handleTranslate}>
            {/* From Dropdown */}
            <div className="relative">
              <label className="text-lg font-medium block mb-2">From:</label>
              <div
                className="flex items-center justify-between border border-teal-400 rounded-full px-6 py-3 cursor-pointer bg-white shadow-sm hover:shadow-md transition"
                onClick={() => setFromDropdown(!fromDropdown)}
              >
                <span>{fromLanguage}</span>
                {fromDropdown ? (
                  <ChevronUp className="text-teal-600" size={20} />
                ) : (
                  <ChevronDown className="text-teal-600" size={20} />
                )}
              </div>
              {fromDropdown && (
                <div className="absolute bg-white border border-teal-400 rounded-lg mt-2 w-full z-10 shadow-md">
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setFromLanguage(lang);
                        setFromDropdown(false);
                      }}
                      className={`px-6 py-3 hover:bg-teal-50 cursor-pointer ${
                        fromLanguage === lang ? "bg-teal-100 font-semibold" : ""
                      }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Text */}
            <div>
              <input
                type="text"
                placeholder="Enter your text here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full border border-teal-400 rounded-full px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>

            {/* To Dropdown */}
            <div className="relative">
              <label className="text-lg font-medium block mb-2">To:</label>
              <div
                className="flex items-center justify-between border border-teal-400 rounded-full px-6 py-3 cursor-pointer bg-white shadow-sm hover:shadow-md transition"
                onClick={() => setToDropdown(!toDropdown)}
              >
                <span>{toLanguage}</span>
                {toDropdown ? (
                  <ChevronUp className="text-teal-600" size={20} />
                ) : (
                  <ChevronDown className="text-teal-600" size={20} />
                )}
              </div>
              {toDropdown && (
                <div className="absolute bg-white border border-teal-400 rounded-lg mt-2 w-full z-10 shadow-md">
                  {languages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setToLanguage(lang);
                        setToDropdown(false);
                      }}
                      className={`px-6 py-3 hover:bg-teal-50 cursor-pointer ${
                        toLanguage === lang ? "bg-teal-100 font-semibold" : ""
                      }`}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Translate Button */}
            <button
              type="submit"
              className="flex items-center justify-center bg-teal-600 text-white w-full py-4 rounded-full hover:bg-teal-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Translating..." : "Translate"}
            </button>
          </form>

          {/* Translated Text */}
          {translatedText && (
            <div className="mt-6 bg-teal-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-teal-600 mb-2">Translated Text:</h2>
              <p>{translatedText}</p>
            </div>
          )}
        </div>

        <div className="mt-10 md:mt-0">
          <Image
            src="data:image/png;base64,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"
            alt="Illustration"
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}