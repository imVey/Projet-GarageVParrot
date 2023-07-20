import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";

export default function Home() {
  return (
    <section className="home flex flex-col gap-5 w-full mx-auto">
      <div className="flex flex-col gap-5 w-full mx-auto justify-center items-center">
        <img
          src="./key.jpg"
          alt="home"
          className="object-cover h-96 w-11/12 rounded-3xl"
        />
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Home Page
        </h1>
        <p className="text-center">
          Bienvenue chez Garage V. Parrot ! Depuis 2 ans, nous vous proposons un
          large éventail de services pour la réparation et l'entretien de
          voitures, ainsi que la vente de véhicules d'occasion. Notre équipe
          qualifiée prend en charge la carrosserie, la mécanique et veille à la
          performance et à la sécurité de votre véhicule. En plus de nos
          services, nous vous offrons la possibilité d'acquérir des voitures
          d'occasion de qualité pour accroître notre chiffre d'affaires.Nous
          nous engageons à offrir une expérience d'achat agréable et sans
          stress, avec un service clientèle exceptionnel. Faites confiance à
          Garage V. Parrot pour tous vos besoins automobiles, où votre
          satisfaction est notre priorité absolue.
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full mx-auto justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Actualité</h1>
        <div className="flex flex-row gap-5 w-full justify-center items-center">
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <a href="#">
              <img class="rounded-t-lg" src="./article1.webp" alt="article1" />
            </a>
            <div class="p-5">
              <a href="#" target="_blank">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Renault Arkana 2023 : un restylage pour aller chercher le
                  Peugeot 3008 ?
                </h5>
              </a>
            </div>
          </div>
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="./article2.webp" alt="article2" />
            </a>
            <div class="p-5">
              <a href="#" target="_blank">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Nouveau look, nouveau logo et enfin de l'hybride : voici la
                  Peugeot 208 version 2023
                </h5>
              </a>
            </div>
          </div>
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="./article3.webp" alt="article3" />
            </a>
            <div class="p-5">
              <a href="#" target="_blank">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Mercedes CLE 2023 : un nouveau coupé dans la gamme de l'Etoile
                </h5>
              </a>
            </div>
          </div>

          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="rounded-t-lg" src="./article4.webp" alt="article4" />
            </a>
            <div class="p-5">
              <a href="#" target="_blank">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Les vrais chiffres de consommation et d’autonomie du Smart #1
                  électrique
                </h5>
              </a>
            </div>
          </div>
        </div>
          </div>
          <div className="flex flex-col gap-5 mx-auto justify-center items-center">
                      <h1 className="text-3xl font-bold text-center">Marques</h1>
          <div className="flex flex-row gap-5 flex-wrap w-full mx-auto justify-center items-center">

              <img src="./audi.png" alt="" />
              <img src="./bmw.png" alt="" />
              <img src="./mercedes.png" alt="" />
              <img src="./volkswagen.png" alt="" />
          </div>
          </div>
    </section>
  );
}
