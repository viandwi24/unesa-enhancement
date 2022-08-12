/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
// console.log("wow", window);
// import("./components/Demo");

// kontennya_siakadu

const isSiakadu = () => {
  const url = window.location.href;
  return url.includes("siakadu.unesa.ac.id");
};

const isSSO = () => {
  const url = window.location.href;
  return url.includes("sso.unesa.ac.id/dashboard");
};

const getOption = async function <T>(key: string, defVal: T) {
  let val = defVal;
  const p = new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      val = result[key] as T;
      resolve(val);
    });
  });
  await p;
  if (val === "true" || val === "false") {
    val = (val === "true") as T;
  }
  return val;
};

const main = async () => {
  // siakadu++
  if (isSiakadu() && (await getOption<boolean>("siakadu.active", false))) {
    const getPage = <T>(must?: string) => {
      try {
        const content = document.querySelector("#kontennya_siakadu");
        const breadcrumb = content.querySelector("ul.breadcrumb");
        const item = breadcrumb.querySelectorAll("li")[1];
        const title = item.querySelector("a").innerText;
        if (must) {
          return title.includes(must) as T;
        }
        return title as T;
      } catch (error) {
        return undefined;
      }
    };

    // siakadu++ - krs
    if (getPage<boolean>("KRS Mahasiswa")) {
      const table = document.querySelectorAll("table")[4];
      if (
        table
          ?.querySelector("tbody")
          ?.querySelector("tr")
          ?.querySelector("td")
          ?.querySelector("strong")
          ?.innerText.includes("TABEL KELAS YANG DITAWARKAN")
      ) {
        const tab1 = table
          .querySelector("tbody")
          .querySelectorAll("tr")[1]
          .querySelectorAll("td")[0];

        // create text input
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "filter_title");
        input.setAttribute("placeholder", "Cari...");
        input.style.width = "100%";
        const wrapper = document.createElement("div");
        wrapper.appendChild(input);
        tab1.insertBefore(wrapper, tab1.firstChild);

        // handle input
        let filter = "";
        const onInputChange = (e: Event) => {
          filter = (e.target as HTMLInputElement).value;
          applyFilter();
        };
        const applyFilter = () => {
          const tableToFilter = document
            .querySelectorAll("table")[4]
            .querySelector("tbody")
            .querySelectorAll("tr")[1]
            .querySelectorAll("td")[0]
            .querySelectorAll("div")[1]
            .querySelector("table");
          const tbody = tableToFilter.querySelector("tbody");
          const datas = tbody.querySelectorAll("tr");

          // highlight filtered rows
          let found: HTMLTableRowElement;
          for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            const child = data.querySelectorAll("td");
            const title = child[0].innerText;
            // regex, search for filter in title
            if (title.search(new RegExp(filter, "i")) > -1) {
              found = data;
              break;
            }
          }
          if (found) {
            const wrapperEl = tableToFilter.parentElement;
            const scrollToEl = found;
            const scrollTo = scrollToEl.offsetTop - wrapperEl.offsetTop;
            wrapperEl.scrollTop = scrollTo;
            // set style
            found
              .querySelectorAll("td")
              .forEach(
                (td) => (td.style.backgroundColor = "#f5f5f5 !important")
              );
          }
        };

        // add
        input.addEventListener("input", onInputChange);
      }
    }
  }

  // SSO++
  if (isSSO()) {
    // sso - popup blocker
    if (await getOption<boolean>("sso.popup.blocker.active", false)) {
      const modals = document.querySelectorAll(".modal");
      setTimeout(() => {
        for (let i = 0; i < modals.length; i++) {
          const modal = modals[i];
          modal.addEventListener("show.bs.modal", (e) => {
            console.log("show", e);
          });
          if (modal.classList.contains("show")) {
            modal.classList.remove("show");
            modal.removeAttribute("aria-modal");
            modal.removeAttribute("role");
            modal.removeAttribute("style");
            modal.setAttribute("aria-modal", "true");
          }
          if (document.querySelector(".modal-backdrop")) {
            document.querySelector(".modal-backdrop").remove();
          }
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "auto";
        }
      }, 500);
    }
  }
};

try {
  main();
} catch (error) {
  console.log("unesa ench.", error);
}
