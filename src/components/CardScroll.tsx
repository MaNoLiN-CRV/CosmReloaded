import './styles/CardScroll.css';
interface CardScrollProps {
    cards: Card[];
}

interface Card {
    title: string;
    description: string;
    image?: string;
}

export const CardScroll = ({ cards }: CardScrollProps) => {
    return (
        <div className="card-scroll">
            {cards.map((card, index) => (
                <div key={index} className="card">
                    {card.image && <img src={card.image} alt={card.title} />}
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                </div>
            ))}
        </div>
    )
}