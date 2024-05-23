// src/components/TerminalAnimation.js
import React, { useEffect } from 'react';
import './terminalAnimation.css';

const TerminalAnimation = () => {
  useEffect(() => {
    const terminal = document.querySelector(".terminal");
    const hydra = document.querySelector(".hydra");
    const rebootSuccessText = document.querySelector(".hydra_reboot_success");
    const maxCharacters = 24;
    const unloadedCharacter = ".";
    const loadedCharacter = "#";
    const spinnerFrames = ["/", "-", "\\", "|"];

    const DrawLoadingBar = (values) => {
      return new Promise((resolve) => {
        const loadingBarAnimation = setInterval(() => {
          if (!values.includes(unloadedCharacter)) {
            clearInterval(loadingBarAnimation);
            resolve();
          }

          values.pop(unloadedCharacter);
          values.unshift(loadedCharacter);
          RenderBar(values);
        }, Math.floor(Math.random() * 250) + 50);
      });
    };

    const DrawSpinner = (spinnerFrame = 0) => {
      return setInterval(() => {
        spinnerFrame += 1;
        document.querySelectorAll(".spinner").forEach(
          (spinner) =>
            (spinner.innerText = `[${
              spinnerFrames[spinnerFrame % spinnerFrames.length]
            }]`)
        );
      }, Math.floor(Math.random() * 250) + 50);
    };

    const AnimateBox = () => {
      const first = hydra.getBoundingClientRect();
      document.querySelectorAll(".spinner, .glitch--clone, .hydra_rebooting").forEach((element) => element.classList.add("hidden"));
      rebootSuccessText.classList.remove("hidden");
      rebootSuccessText.style.visibility = "hidden";
      const last = hydra.getBoundingClientRect();

      const hydraAnimation = hydra.animate(
        [
          { transform: `scale(${first.width / last.width}, ${first.height / last.height})` },
          { transform: `scale(${first.width / last.width}, 1.2)` },
          { transform: `none` },
        ],
        {
          duration: 600,
          easing: "cubic-bezier(0,0,0.32,1)",
        }
      );

      hydraAnimation.addEventListener("finish", () => {
        rebootSuccessText.removeAttribute("style");
        hydra.removeAttribute("style");
      });
    };

    const PlayHydra = async () => {
      terminal.classList.add("glitch");
      rebootSuccessText.classList.add("hidden");
      document.querySelectorAll(".spinner, .glitch--clone, .hydra_rebooting").forEach((element) => element.classList.remove("hidden"));
      const loadingBar = new Array(maxCharacters).fill(unloadedCharacter);
      const spinnerInterval = DrawSpinner();

      await DrawLoadingBar(loadingBar);

      requestAnimationFrame(() => {
        clearInterval(spinnerInterval);
        terminal.classList.remove("glitch");
        AnimateBox();
        setTimeout(() => {
          window.location.href = "/chat";
        }, 5000);
      });
    };

    const RenderBar = (values) => {
      const currentLoaded = values.lastIndexOf(loadedCharacter) + 1;
      const loaded = values.slice(0, currentLoaded).join("");
      const unloaded = values.slice(currentLoaded).join("");

      document.querySelectorAll(".loading-bar").forEach((loadingBar) => {
        loadingBar.innerHTML = `(${loaded}<span class="loading-bar--unloaded">${unloaded}</span>)`;
      });

      const loadingPercent = Math.floor((currentLoaded / maxCharacters) * 100);
      document.querySelectorAll(".process-amount").forEach((processAmount) => {
        processAmount.innerText = loadingPercent;
      });
    };

    const HideAll = (elements) =>
      elements.forEach((glitchGroup) =>
        glitchGroup.forEach((element) => element.classList.add("hidden"))
      );

    const ShowAll = (elements) =>
      elements.forEach((glitchGroup) =>
        glitchGroup.forEach((element) => element.classList.remove("hidden"))
      );

    (glitchElement => {
      const glitch = glitchElement.cloneNode(true);
      const glitchReverse = glitchElement.cloneNode(true);
      glitch.classList.add("glitch--clone", "glitch--bottom");
      glitchReverse.classList.add("glitch--clone", "glitch--top");
      glitch.setAttribute("aria-hidden", "true");
      glitchReverse.setAttribute("aria-hidden", "true");

      glitchElement.insertAdjacentElement("afterend", glitch);
      glitchElement.insertAdjacentElement("afterend", glitchReverse);
    })(terminal);

    PlayHydra();
  }, []);

  return (
    <div className="terminal glitch">
      <div className="scanline"></div>
      <div className="hydra">
        <div className="hydra_rebooting">
          <p>&lt; LOGGING IN &gt;</p>
          <p className="text--sm">DATASLATE V231.231.2-1</p>
          <p className="text--sm">PROCESS: <span className="process-amount">0</span>%</p>
          <p className="loading-bar"></p>
        </div>
        <div className="hydra_reboot_success hidden">
          <p>LOGGING IN SUCCESSFUL</p>
        </div>
      </div>
    </div>
  );
};

export default TerminalAnimation;
