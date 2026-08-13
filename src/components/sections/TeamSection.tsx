"use client";

import React from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/brand-icons";
import { ScrollReveal } from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { ITeamMember } from "@/types";

interface TeamProps {
  teamMembers?: ITeamMember[];
}

export function TeamSection({ teamMembers = [] }: TeamProps) {
  return (
    <section className="py-28 bg-[#F7F7F5] text-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="outline" className="mb-4 font-mono text-xs uppercase tracking-widest bg-white border-zinc-200 text-zinc-700">
              WORLD-CLASS TEAM
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-[1.08] text-zinc-950">
              SENIOR ARCHITECTS & CREATIVE ENGINEERS
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Veteran software engineers, AI specialists, and UI motion designers passionate about building exceptional software.
            </p>
          </div>
        </ScrollReveal>

        {/* Team Grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={member._id || idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs hover:shadow-xl text-center flex flex-col justify-between h-full group transition-shadow duration-300 transform-gpu">
                <div>
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-zinc-100 border-2 border-zinc-200 group-hover:border-zinc-950 mb-6 transition-colors duration-300 shadow-xs">
                    {member.avatar ? (
                      <Image src={member.avatar} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300 transform-gpu" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-zinc-950">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold uppercase text-zinc-950 group-hover:text-blue-600 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono font-semibold uppercase text-blue-600 tracking-wider mt-1 mb-3">{member.position}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-6">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  {member.skills && (
                    <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F7F7F5] border border-zinc-200 text-zinc-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-center gap-3">
                  {member.socialLinks?.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#F7F7F5] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#F7F7F5] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#F7F7F5] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-colors"
                      aria-label="Twitter"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
