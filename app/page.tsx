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

  const handleTranslate = async (e) => {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-gray-800">
      <header className="flex justify-between items-center p-6 mx-auto bg-white shadow-lg rounded-lg">
        <div className="text-teal-600 font-extrabold text-4xl">Translate</div>
        <div className="space-x-6">
          <button className="text-teal-600 hover:text-teal-800 font-medium transition">Log in</button>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">Sign up</button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row items-start justify-between px-8 md:px-16 lg:px-24 py-10  mx-auto ">
      <div className="mt-10 md:mt-0 ml-0 md:ml-10 transition-transform transform hover:scale-105">
          <Image
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSERIWEhUWFxcVGBcXFhsbHxgbFxkXHxcaGBcYHygiGBslHRcYIjEhJikrLi4uFx8zODUsNygtLisBCgoKDg0OGw8QGi8lHyAvMi81NS0tLS0tLS0uLS0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLf/AABEIAJoBSAMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAIDAQj/xABHEAACAQMCAwQHBQUEBwkAAAABAgMABBESIQUGMRNBUZEHIlJhcYHRFBYyYqEVI0KSsTOCssEkNENyk6LCF1NUY3OD0vDx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACkRAQADAAIBBAAFBQEAAAAAAAABAhESIQMEMUFREzJicYEVM0JhoRT/2gAMAwEAAhEDEQA/ANFpSlWcRSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSuHi/E0t01NuTsqjqT/AJD31SL/AIxNMTqcqvsrsP06/Oufzepr4up93V4PS38vftDQmmUdWA+JFegw652rKyo8K/cVzf8Av/S6v6d+r/jVAaVlsblTlSVPiDj+lWPgXMjBhHOdQOwc9Qe7V4j31p4/W1tOTGMvL6C1Y2s6t9KUrtcBSlKBSlKBSgP6dfdSgUpSgUpSgUrzLKqjLMFHixAHma/IpVYZVgw8QQR5ig90pSgUpSgUpSgUrysikkBgSOoBGR8R3V6oFKUoFKUoFKUoFKUoFKUoFKUoFKVCcw8cWFSiEGUjYexn+I+/wFVveKRsr0pN7RWFZ5ivTLO2/qp6i/Lqfmc/pUZSvcMbOcIpY+Cgn+leFe02tMy+hpWKVisfDzXTYWDzaxGM6ELn5d3xPd8Kk+Hcq3EpBZeyXxfr8kG/nirzwjhUdumiMe9mPVj4n6VEV0tfPZlINCKuXMfKZJMtsBvu0fTfvKd3y/8AyqfLGykq6lWHUEYPkaiYxaLRK9crX5lhAY5ZDoPvH8J8tvlUxWf8vcT+zyZb8DbN7vBvl/Qmr9G4YAqQQdwR3/A17HpfLzpnzDxPV+HheZj2l6pSldLkKyb0gekCV5TY8OJzns2lTdnY7FIsdN9tQ3J6YG5unpG4y1pYTSIcO2IkPgZNsj3hdR+VYz6PeYLWxmeeeJ5XC6YtIX1Sc6idRGDjbI7iaiWvjr1rsueB8V4RovdWnURr0OXwTvpnHRs5PiM9+cVsPJfMycQtxMo0uDpkT2W935SNwfoaznmD0sx3EEtuLI6ZUZNTSjYkbNpCdQcHr3VG+hbiZjvzDn1Z42GPzRgsp8g4/vUXtEzXZ92k8wekSys5zbydq8i41dmgIXUARksw7iDtmpG+5wsIW0S3cSt0IDasf72jOn51ifPFoZuMzRA4Mk6Rg+BcIB/Wrvz16PLODh7yW6FZYQray7HtBqAfUCcdCTsBuKK8a9L5dcy2UaCR7qEIwyp7RTqH5QCS3yr1wfmK0usi2nSUjcqDggeOk4OPfisq9EvKVpeRTy3Ufa4YRqNTLj1csfVI33HlULxC0PCuMKsTEIksbKSdzHJp1KfHZmX34ppwjZhbfTzdER2sXczSOfigQD/G1dvJXM3DrDh1uklymtgZHVAXYMxJwwQHSQMDfHSof09f2lqPyy/4kqf5M5Bsm4fEZoVkknjEjSHOV7QZXRv6uAR07xRPXCNXDgfHbe8QyW0okUHB2IKnwZWAI/zrl45zbZWZ03E6o/XQAWbfoSqAkD41lHoVuGTiEkWfVeJwR4lGUg/L1vM1cOYOW+GW93Jf38wZZd1gcFvX2DMFXLOPdjC5+GCs0iLYn+E89cPuXEcVyuskAK4ZMk9AC4AJ9wNTl/eRwxtLKwREGWY9w+Vfz3z5f8NmdDw6FosahIcaVbppKpk4PXw6itHvb5rjlsyuSzGABiTkkpKFJJ7ydOaaTSOlotecbCRHkS6j0R41kkrjVnGzAE5wemacA5usr1mS2mDso1FSrKceIDAZHw6ZFZH6KeUIL55nuQWjiCgKGK6mfPUjfAC9B41ofAuQYLCa4uonZsxuI0P+zUjLAt1c5Gx2wPHrTS1ax0h+SuC8LF/21pfyTyjtGEeD0OQxZyvrj1v6da0i7ukiQySusaLuWYgAfEmsR9Bw/wBPk91u+P8AiRV9vSLxCXiHE04ejYjSRYlHdrbGuRh3kZI+C+80Tau2xoD+krhYbT9pzvjIjkI89PT31Z7K7jmRZInWRG3VlOQe7qPeMfKqyfRzw3sDAIB0x2uT2mfa1+Od8dPdipfljgcdlbpbxszBdR1NjJLHJO2w8Me6pUnjnSVpSlFClKUClKUClKUClKUCormSYJA7YGojQpwNi223wGT8qlaq3PE20Se9m8sAf1NY+e3HxzLf01eXliHvk7gisi3LjPrlVyRjIHh3nr5fOrlICBhAM92en6f0/pWW8DuBHcRMxwocZJOAAdiT8jWoSx6sYbHft315FcmOntXid7VTgvPdvLcta5cuJTCGYIupgHzpjB1dmChGo53YZ61ca4o+E26ymdYIhM2xlEahznrl8ZNc09ve6m7O4gCk5XXbuWQeHqzKH+OBWs8Z/L0xjY90ZzhzhFZSQwOGDTZIkyFWMAgFmZlbffppPyqS4a8d3bxyyKJEkRZF1oAcMM+sNwG94OK77qyjlAEsaSAHIDoGwfEahsai+P8AFmtEDDSzMwCKw2wOpIGNgNvmKiZpxTEW1T+HWfZ3axTorBsjHUbglSM+8Yq8wxKoCqAoHQAYA+QrPba6Z7pJWPrNKpOOgyw2HgB0ArRRXX6HOMuP18Tyj9ilKV3PPZ36cgfsEXh9pTP/AA5sVX/QtwW0n7eSaNZZUKBVcBgqkH1gp2JJBGTnGB0zWscX4XDdRNDcIJI2xkZI3ByCCCCD8Ki+CcmWVnJ21tEY3wVz2khyD1BDMQegPxAo0i8ccSPElt4oZHljjESIzOCi40gbjGN8+FYN6MPW4tblRgapTgdw7KTbyreuNcJhu4jDOpeMkEqGZc6TkZKkHGd8e4VG8D5LsbOTtreHQ+krqLu2AeuAzED40K2iIlknMD6OYNR2Au4CfhmM/wBK0/0q3XZ8MuPF9EY/vOuf+UGuni3I9hczGeaEtK2MsJHX8IABwrAZwB5VJcd4HBeRiK5QugYPgMy7gEDJUgnqaJm0Tn+lG9BX+qT/APr/APQtU30kz9rxllXfS0EY95whP6sR8q2rgPAreyjMVtH2aMxcjUzZYgDOWJPRRtUd9xrD7R9qMBM3adrqMjn185zpLY674xioIvHKZUL09j95a/7sv+JKvvL9+sXCYZido7NGP/txb/quK6+YOV7S+KG6i7Ts9Wn12XGrGfwkZ6CvqvL9uLX7EEPYaSmjW2cFtRGvOrqfH3dKlE2iaxDHfQnFq4izezBI3myD/qri4ver+2nfias8aTsrKQdoxnsvV70xpbA6jPXNbRwDlSzsmZraLsy4CsS7NsN8esTivvxjl60u/wDWbdJSBgMRhgPAOuGA+dRi34kayz0s8csJ7aCO0eN2V9WI0xpTSRjoMb4291SnCgTyw4HdHL+lwxP6VY/+zLhX/hj/AMWX/wCdTltwC2jtjaJFpgZWUpqY7PnV6xOe/wAaIm8ZEQzn0Cz7Xcff+6f/ABg/5Vqd8MxyD8jf4TURwDlCzsnaS2iMbMugntHbIyD0ZiOoG9TpFSra0TbYYF6GrkJxJVP+0jkQfHAb/opzqsvD+MNcac/vRcR56OCQWGfjqU1rHDOQuH28qzwwFJEOVPaSHBII6Fsd9SvGuCW92nZ3MSyqNxnIKnxVhgr8jUYv+JHLVXT0rcNMestKGx/ZdmS2fAH8Hz1VPcocZe8tluXj7LWz6F/IGIUk95wOvSoi39GHDEYN2LPg50tIxHzAIz8DVvjjCgKoCqAAABgADoAB0FSpaa/D1SlKKFKUoFKUoFKUoFKUoFUb0g3SxurucKsYPmzbDxJwKvNZf6X1Lz2cQONevPwDKB5anrHz050yXR6a/Hyapd/xC4njeQfu4Rtj2snGM/xdd+grUORmuH4Ap4f611BLIAg0evmQnQ/abBdEgbYg+qMHuqg80gJbqijA1KoA8ACf8q6vRTzqOHXDJMf9GmwHP/dsPwyYHd3N7sH+HBy9PxtTqOnZ5trbue2v8rcxw30IliYahtJHkao27wR4eB6EVM1X+Nejq0u5Irq2lazIVvXs9Cdpr3DFlG+/f3iomP0b8RdAJ+Mzn1xqVC4DR94zqDBz47j3HrWdvSd9SmPP12lOI8wMbuGxtOyeZjrm1ltMUS7uCU6SkfhB+fUZykc6SXU2LlgRqYRMAFGktsDjvOBvWi83TWfArCaCzyk10W0IZGdgzqFaX1ySAoGfecCsaFqDYh+9HOPgSAR/Tyq1/DStOM/PyU8lptsfC/8ACEzPEP8AzE/Rgf8AKtJFZ16PEMrRSN/DHqJ95GkeeSflWi1Po6TWs/ux9feLWjPopSldjgR/GuN29oge4k7MMcLsWJI64VQSarrekzh+djKfeI/qQamuM8tQXcsclwDIIgwWPOFJYgksBu34RtnHiDWe8btIJeNw2yxokaGJGRVCg6UMpBAGNwQKtEQvERK98F5ysrpxHDN65zhGVlJwCTjUMNsCcA91T9RScAtkm+1JCqShGXKjA379I21YGNWM4OKoHKvNPF75ZEh7FmCoxkdQoj1Z2AGzFsHGQQNJpm+yM32apSqTb3vGfsKkwqbpphHlgoKxEf2jouFzqyNu7fFRfGOO8T4ayNc3EF2jMQ0aqqsMDJA0qpHuY5Hj1FMOLSqVSvSVx6WC0he2kMZlkX1hjOjQzbZG2fVqIl4rxmGxS6YwhFVSdQLSsrt6ruDsPxDYYIH6MOLTKVULrnJl4Wt8sYLthNOTpVyxVie/SCCQO/YZ3qHsb3jMsC3dvc29yGwTAqoNOeqk4UgjvBcdDjNMOK58xcfhso1ln1aWcIAgySSGPQkbYU/pXXw29WeKOZAwWRQ66hg4YZGRk42rP/TDI/2S17QAOXLMFOVDCP1gpO5GWOKs3GTex21vHYRqzns42ZsERrpA1YPUZHXBx4GmdGdLHQms14pzDxHhkkf2u4hvI3J1KqqrqBjVgKqkbHYkEHptUp6T5LkWrvFIi25RUkUrl37RgNm7hgjzNMOK3QX8TqzxyJIqEhijBsFRkg6c7gEbdd6j+XOZbe+V2t2ZghCtqUr16eePj44qrckRXVrYNOZIuw7CaZEC+sH/ABKzN3jAO3+7XbyTzJI9jPd3bAiN3PqoF9VUQnZerEk/pTDF0pWfcLveMX6G5glhtIiSI0KBtek4OWZWOM5GdskHapXk/mmSft4bpBHc2+dYXowBIJA3wQRg743UjrgMOK2UrJ+S+N8Xu2lMUiONIyZ86IyxyAgQbtsR0IAG/dmxckcz3MtzNZ3gXtYtRDKMfgYK4ONj+IEEY2pNSartSlKqqUpSgUpSgUpSgUpSgVTOeeW57q4s5IF1CNnWQ5A0qxQ6vWIzjDbDernX1gkAFZ+aZik5GtvBnONnGF8/WrxBY5F0sH6f3TuD3j31Tq2j0wWRls1dVLGKZW2GTpKupx34yyn5VmPK/K11xCXs7aMkD8cjZCIPFm7z+UZJqni8fCuOm3k/EnkuvoglvOxvHjvGt7e3UOQYxIucOz6FYgIcLk466hV8tOH8Tk7W3m4q6ymITIY4IUBD5GNRUsCrrg47mXx2i+I8KjsYbHgdu2p7ybVcORgvGmGnbHdqVdIHsqR76sHFeIrHxy0jZtPa2k6L72MkbAfHEbYrVV/PPHGldlmlRlaRcEvN2rO0Z0yMxYll9b+E9MbV9rWbtLdLaL1nkkOw3wM5Gce/+hrSeaeRWg4iZEhD2txL23aLEjvDJglo27TKrGzZbOht8KFJxm+z2cJZJOzTWgKq2kZUHAYAgbbju8Kwt3MVlpE8azZE8qcGFrAqfxEDPuwMAfL+pNTNKV0VrFYyHBe02nZKUpUqlY5xC5EXHy7dBcRg/B40X+jVsdcF3wO1lftJbaGR9vWeJGO3T1iM1MTi1Zx3ONiPjWY+hOTAuYzjIEB+P9qD8ht51p9cdlwm3hZmhgiiZvxMkaqW3zuVGTvSJ6wiesVb0rcSuILVewYoHfRI65BUaTpGofh1Hv8Adjvqj8zxcLFnF9ibVOXBdiW1kaW1mQHYetjYfLbNbY6ggggEHYgjIPxFRjctWROTZ25Pj2EefPTUxOJi2M99IzF+G8PbxRPMwrj+hqyc736/scsP9rHAq+/UUJx/dBqz3XC4JEWOSCKRFxpRo1ZVwMDSpGBgbbV+XHCbeSNYpIInjTGlGjUquBgaVIwMDbamo1QeC8SS14RbGeHtoJZpEmBXOlHeUhsdPxBevy3Iqv8AMn7OgC3HC7qSOXUPUUvgLuSSzgMu+PVJOfCtkjtY1TslRRGBpCBRpx4aemPdXDbct2cbh47SBGG4YRKCD7ttvlU8k8oZ96R5ZZeHWMk66ZWzrGMes0eckfwkgZx3Zrv9IPGp1sbRoGZI5kXtJEO/4E0pq/h1ZbvGdOPGr9fWEU6hZ4o5lB1BZEVgDuM4YHfBO/vr3HaxqgjVFEYGkIFAUDwC9Me6o05QxXnGLhYtoRw8hpCxLk69RUqc9oG2B1Y2HvxtV65/y/CNQ9m3Y/Asn1qwnlqxzn7HbZ8ewjz56a7p7SN4zE6K0ZGkoQCpA6DT0xsKaclN4BdrNwNwpBKW80TDwZFbY/LSfnVf5ItmueFX1tHvJqDKM9cqhUe7JiI+danHaxqnZqiqmNOgKAuD1GkbY91fHh/C7eDV2EEUOrGrs41TVjOM6QM4yfOnJGs75M58t7a1FvcrIrwlgNKZ1DUTjGfVcEkENjp16gfnI8clzcX1/pKJJHKi+BZ8HAPfpCAE+LfHF/vuA2kza5raGR/aeNST8SRv86744lVQqqFUDAAGAB4ADpTYTNoZ16FJQYZ1HXXG3yZMD9VNcvI8wm4zdzLupWfB8R2sYU/MCtFsOFW8GrsIIodWNXZxqmrGcZ0gZ6nzpYcJt4CTBBFCW2JjjVM46Z0gZpyNjt2UpSqqFKUoFKUoFKUoFKUoFKUoPUbYIPgQf1q0CqrX1W5cdHbzpMNKX4vlxTk3tuJw8SE7K0Kqix6QVI/eh8nOQSspx4Ed9dPMXJttezRXE2sSQj92yNp0tqVlf3lSuwORudq+0l7IFBDfoK8w8QkJwW/QfSsovE1m306JnLRX7T2KgeLriT4gH/75V4mvZMkaz8tv6VzMSdySfjV69xrLyW/xflKUqzApSlApSlAJxudqo9z6Soe0aO2t5rrT/Eg2PvXGWK+8gf51cb+2EsUkRJUSI6EjqNakZHv3rLOEPxHgxkU2nbxOQSyZwdI2IdQSgx3Mv+ebRC1YXDl3nu3u5ew7OWGU5wrrkHSCSMr0IAP4gKtVU7lnm6wu59SxiG6ZdALqup1G+lZB+Lp0ODt02rj5n49PNejh9rOtqFGqaY4yPVDEKTjGAV6EEk9QAaZ2Z2vtKymDis1tfwQWvEH4ikjKJEJ1gAthvWyw2GWypGNO+1fbjfFr48Za2trhkBaNUVt4wDAjOSnQ4yzfECnE4tQpWcX3CuKWsd3K988qCHUrAkMXDISVXfssKHBwcEN5T/o0v5J7JXlkaR+0kBZzk7HYZPdgimfJiw31x2cbyBGkKKW0IMs2BnSo7ya4uXeLtdRdo1vLbnUV0yjBOAPWGcEjfHQbg1nnBOOXTWvE5jcSsEVRExYkoWZxlSeh0lf0qf5c5iaHg/2yd2ncGTGtiSzdqURdXcM4+AzTinj0vFKzrgvCeIcQh+1TcQkt9eTEkQIUAHYkKw9XPQbnG5NdvG+O3XDeHx9u6zXblkDdQPxHUdhr0rgdNyRnvpiOK8UrJuONPaw9s/Gma69UmFXyN+oCqcDG+5UKcYwKsHGeYrxOER3ITRO+lXbSPUBLDtNJ2GoBcZ6GQeFOJxXmlZdwi2uLhEks+Mu9wdJkilYjTn8WEYnIG/8ACQcd1afGCAAxycDJxjJ7zju+FRMYiYx6pSlQgpSlApSlApSlApSlApSlApSlApSlSPq/4VrzF+IV6f8ACteI+ornr/bt/Lpv/cr/AA/ZfxH414r1L+I/GvNa0/LDHyfmkpSlWUKUpQKUpQRnM1pJNaTxQnEjxsq74yT3Z7sjIz76onDvSQ9sggvraQSoAuoEKWxsCyvjf3g4PWtOr8dAeoB+IzUxKYljFuknFeIpcW8HYoHjZ2HQdmwJZnwAZD0wN9h7zXTz1wpYOIm5uoXmtJWDnRtvoClS2RghgGwSMjYHrjXwKGrcluTPuB8y2jOkHCbIh3ZBI5jVVRMjWXcEsxC5xnbONz0MdfuIuY0ZjgOydfz2/Zj/AJhWoogGwAA9wxX7io1HJ87iBZEZHGVZSrDxDDBHkax1Jr7hjz8PiQyGc/umwSTkY7SPGxYrgEdFIz0G+zUxSJwicUGfl37FwW4iOO0ZO1lI6asrkA+CqoHyJ76h+AWbXnBJYIfWkimJC+1grJp+JDMB78Vq1AKcjkyrlr0ipawJbXEEheIaF04BIH4QyuQVYdO/p8q6+drG6vrCG5MBSSNpWMIyWEUh9UlerMAiEjGdzsOlaSUGc4GfHG/nX7TkcoZLy9zFweBE02UjXAwMFFkYvjcqzNtv4AH3VbOL8bvIbW3uJbbWGZjcwqMlI21aBv3qCuokYyN8A7WwIM5wM+ON/OvVJkmWH8yXvD7kx/s23ljuNWSEXT440ojHD5wcrj6bJwVZRbxC4OZRGgkP5sDV07811KgG4AGfAV6pMkzpSlKqqUpSgUpSgUpSgUpSgUpSgUpUXf8ACnkJImYZ/hPQfDBFEpJpAOpA+Jr5teRjrIn8w+tV9+XZO5kPn9K+Z4FN4Kf71NTkLJw/iMdwjGFg3ZSPG4B3DKfd3EYI8Qa5eIcet7de0lkUKrIrbj1dbqmSPAFsn3A1X4+XpVYusaqzdWUqpPxYYNfGPlZlLkRD94dT5fVqOckkMxBPvrOKZEx8S1m1ZmJ+l3uGC+uSApwdWRjfpv0r4i6j7nX+YVUZuV3dDG0SlDjKZGk46bDauiPl6UAABQBsPWP0qaRMRkq34zOws/2hPbX+YU+0J7a/zCq3+wJfyeZ+lP2BL+TzP0q+qZH2sn2hPbX+YU+0J7a/zCq3+wJfyeZ+lP2BL+TzP0ppkfayfaE9tf5hT7Qntr/MKrf7Al/J5n6U+78v5PM/SmmR9rJ9oT21/mFPtCe2v8wqt/d+X8nmfpT7vy/k8z9KaZH2sn2hPbX+YU+0J7a/zCq3935fyeZ+lPu/L+TzP0ppkfayduntL5inbp7S+YqufsCXxTzP0p+wJfFPM/SmmQsfbp7S+Yp26e0vmKrn7Al8U8z9KfsCXxTzP0ppkLH9oT2l8xTt09pfMVXP2BL4p5n6V+fd+XxTzP0ppkLL26e0vmKduntL5iq1935fFPM/Sn3fl8U8z9KGQsvbp7S+Yp26e0vmKrX3fl8U8z9Kfd+XxTzP0oZCy9uvtL5ivzt19pfMVXPu/L4p5n6U+78vinmfpTTIWPt19pfMU7dfaXzFVz7vy+KeZ+lPu/L4p5n6U0yFj7dfaXzFelkB6EH4Gq1935fFPM/Sv1eXpO9kHn9KaZCzUqKsOFPGQTMxx/COh+OSalaIkpSlEFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP/Z"
            alt="Illustration"
            width={600}
            height={800}
          /></div>
        <div className="max-w-7xl space-y-6 bg-white rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105">
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
              <p className="text-gray-800">{translatedText}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}