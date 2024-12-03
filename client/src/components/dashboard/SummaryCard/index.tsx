import React, { memo } from "react";

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, amount }) => {
    return (
        <div className="flex items-center bg-primary shadow-md rounded-lg py-4 gap-10 sm:gap-8 lg:gap-4 xl:gap-7 lg:pl-5 pl-8 w-full">
            <div className="bg-tertiary h-10 w-10 rounded-lg self-center text-green-100 flex items-center justify-center">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-xs">{title}</div>
                <div className="text-textTertiary text-2xl">{amount}</div>
            </div>
        </div>
    );
};

export default memo(SummaryCard);
