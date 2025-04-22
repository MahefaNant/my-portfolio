import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { TimelineItem } from "../Timeline";


interface ICardInfoProps {
    item: TimelineItem;
    index: number;
}

export function CardInfo({item, index}: ICardInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`relative flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className={`hidden sm:flex absolute top-6 ${
          index % 2 === 0 ? "left-1/2 -translate-x-1/2" : "right-1/2 translate-x-1/2"
        } w-4 h-4 rounded-full bg-primary`}
      />

      <div
        className={`w-full max-w-md ${
          index % 2 === 0 ? "mr-auto pr-8 md:pr-16" : "ml-auto pl-8 md:pl-16"
        }`}
      >
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="mb-2 justify-items-end">
            <Badge variant="outline" className="text-sm">
              {item.date}
            </Badge>
            <hr/>
          </div>
          <div className="mb-2 justify-items-start">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-muted-foreground">{item.company}</p>
          </div>
          <p className="text-muted-foreground mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}