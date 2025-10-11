import Link from 'next/link';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';

 type CardData = {
    id: number;
    type: string;
    title: string;
    perks: string[];
};


type CardProps = {
    data: CardData[];
};

const MovementCard = ({ data }: CardProps) => {

    const userType = data.length > 0 ? data[0].type : 'Movement Partner';

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
                Become a <span className="text-orange-500">{userType}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {data.map(d => (
                    <div
                      
                        key={d.id} 
                        className={`
                            bg-white 
                            shadow-xl 
                            rounded-xl 
                            p-6 
                            flex 
                            flex-col 
                            transition-all 
                            duration-300
                            hover:shadow-2xl
                            ${d.id === 2 ? 'border-4 border-orange-600 scale-[1.03]' : 'border border-gray-200'}
                        `}
                    >
                        <h2 className={`
                            text-2xl 
                            font-bold 
                            mb-4 
                            text-center 
                            pb-3 
                            border-b 
                            ${d.id === 2 ? 'text-orange-600 border-indigo-200' : 'text-gray-800 border-gray-100'}
                        `}>
                            {d.title}
                        </h2>

                        <ul className="space-y-4 flex-grow">
                            {d.perks.map((perk, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <BsCheckLg 
                                        className={`
                                            w-5 
                                            h-5 
                                            mt-1 
                                            mr-3 
                                            shrink-0 
                                            ${d.id === 2 ? 'text-orange-600' : 'text-green-500'}
                                        `} 
                                    />
                                    <p className="font-medium leading-relaxed">
                                        {perk}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <Link href='#connect' className='mx-auto'>
                                <button
                            className={`
                                mt-8 
                                py-3 
                                px-6 
                                rounded-lg 
                                text-white 
                                font-semibold 
                                transition-colors 
                                duration-300 
                                shadow-md
                                ${d.id === 2 
                                    ? 'bg-orange-600 hover:bg-orange-700 shadow-indigo-400/50' 
                                    : 'bg-gray-800 hover:bg-gray-700 shadow-gray-400/50'
                                }
                            `}
                        >
                            Select {d.title}
                        </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovementCard;