class Heading {
    #node;

    constructor(tag = "h1", content) {
        this.#node = document.createElement(tag);
        this.#node.textContent = content;
    }

    get node() {
        return this.#node;
    }
}

class Button {
    #node;

    constructor(content, href = "#", className = "") {
        this.#node = document.createElement("a");
        this.#node.textContent = content;
        this.#node.setAttribute("href", href);
        this.#node.className = className;
    }

    get node() {
        return this.#node;
    }
}

class Card {
    #node;

    constructor(props) {
        this.#node = document.createElement("div");
        this.#node.classList.add("card");

        if (props._color && props._color !== "") {
            this.#node.classList.add(`card--${props._color}`);
        }

        if (props.imageBackground) {
            this.#node.style.backgroundImage = `url(${props.imageBackground})`;
            this.#node.classList.add("image-card");
        }

        this.#renderContent(props);
    }

    #renderContent(props) {
        this.#renderHeading(props);
        this.#renderParagraph(props);
        this.#renderButton(props);
    }

    #renderHeading(props) {
        const heading = new Heading("h2", props.title);
        this.#node.append(heading.node);
    }

    #renderParagraph(props) {
        const paragraph = document.createElement("p");
        paragraph.textContent = props.content;
        this.#node.append(paragraph);
    }

    #renderButton(props) {
        const button = new Button("Explore", "#", "explore-btn");
        this.#node.append(button.node);
    }

    get node() {
        return this.#node;
    }
}

class Grid {
    #node;

    constructor() {
        this.#node = document.createElement("div");
        this.#node.classList.add("grid-container");
    }

    addCard(card) {
        this.#node.appendChild(card.node);
    }

    get node() {
        return this.#node;
    }
}

function Page(props) {
    const node = document.createElement("section");
    node.classList.add("last-works");

    const header = document.createElement("div");
    header.classList.add("header");

    const heading = new Heading("h1", "Last works");
    header.append(heading.node);

    const showcaseButton = new Button("Explore Showcase", "#", "showcase-button");
    header.append(showcaseButton.node);

    const grid = new Grid();
    props.forEach((content) => {
        const card = new Card(content);
        grid.addCard(card);
    });

    node.append(header);
    node.append(grid.node);

    return node;
}

function renderPage(data) {
    const page = Page(data);
    document.body.append(page);
}

function loadData() {
    return [
        {
            title: "Startup Framework",
            content:
                "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.",
            _color: "gray",
        },
        {
            title: "Web Generator",
            content:
                "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.",
            _color: "white",
        },
        {
            title: "Slides 4",
            content:
                "All of these components are made in the same style, and can easily be integrated into projects, allowing you to create hundreds of solutions for your future projects.",
            _color: "purple",
        },
        {
            title: "Postcards",
            content:
                "All frequently used elements are now in symbols. Use them to create interfaces really fast. Easily change icons, colors and text. Add new symbols to customize your design.",
            imageBackground: "assets/bg.png",
        },
    ];
}


function initApp() {
    const data = loadData();
    renderPage(data);
}

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});
