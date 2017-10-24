import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import Avatar from "../avatar";
import LocationLabel from "../locationLabel";
import Tag from "../tag";
import TagList from "../tagList";
import { Heading } from "../text";
import ProfileIntro from "../profileIntro";
import colors from "../../styles/colors";
import {
  fontSizeHeading7,
  fontSizeBodySmall,
  lineHeightHeading7,
  lineHeightReset,
} from "../../styles/typography";
import { textBodySmall } from "../../utils/typography";
import propTypes from "../../utils/propTypes";

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.paragraphLineHeight = 24;
  }

  render() {
    const {
      name,
      intro,
      avatarSrc,
      website,
      location,
      interests,
      interestsLimit,
      alignment,
      style,
    } = this.props;

    const styles = {
      header: {
        center: {
          textAlign: "center",
        },

        left: {},
      },

      flexContainer: {
        center: {},

        left: {
          display: "flex",
          alignItems: "center",
        },
      },

      avatar: {
        center: {},

        left: {
          marginRight: "33px",
        },
      },

      textContainer: {
        center: {
          marginTop: "23px",
        },

        left: {},
      },

      locationLabel: {
        center: {
          marginBottom: "10px",
        },

        left: {
          marginBottom: "7px",
        },
      },

      heading: {
        lineHeight: lineHeightReset,
      },

      website: {
        default: {
          fontSize: `${fontSizeHeading7}px`,
          lineHeight: lineHeightReset,
        },

        center: {
          marginTop: "6px",
        },

        left: {
          marginTop: "8px",
        },
      },

      intro: {
        default: {
          marginTop: "37px",
        },

        center: {
          lineHeight: (this.paragraphLineHeight / fontSizeBodySmall),
        },

        left: {
          fontSize: `${fontSizeHeading7}px`,
          lineHeight: lineHeightHeading7,
        },
      },

      tagList: {
        center: {
          marginTop: "39px",
        },

        left: {
          marginTop: "31px",
        },
      },

      textBodySmall: Object.assign({}, {
        color: colors.textPrimary,
        marginBottom: 0,
        marginTop: 0,
      }, textBodySmall()),
    };

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/; // eslint-disable-line max-len

    const validateUrl = (url) => urlRegex.test(url);

    const urlParser = (url) => {
      if (typeof document === "undefined") {
        return { hostname: "" };
      }

      const anchor = typeof document !== "undefined" ? document.createElement("a") : null;
      anchor.href = url;
      return anchor;
    };

    return (
      <header
        className="ProfileHeader"
        style={[
          styles.header[alignment],
          style,
        ]}
      >
        <div style={styles.flexContainer[alignment]}>
          {avatarSrc &&
            <Avatar
              src={avatarSrc}
              alt={`Avatar for user ${name}`}
              size={80}
              className="ProfileHeader-avatar"
              style={styles.avatar[alignment]}
            />
          }

          <div style={styles.textContainer[alignment]}>
            {location &&
              <LocationLabel style={styles.locationLabel[alignment]}>
                {location}
              </LocationLabel>
            }

            {name &&
              <Heading
                level={1}
                size={5}
                weight="medium"
                style={styles.heading}
              >
                {name}
              </Heading>
            }

            {website && validateUrl(website) &&
              <p
                style={[
                  styles.textBodySmall,
                  styles.website.default,
                  styles.website[alignment],
                ]}
              >
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {urlParser(website).hostname.replace("www.", "")}
                </a>
              </p>
            }
          </div>
        </div>

        {intro &&
          <ProfileIntro
            maxLines={3}
            fontSize={
              (alignment === "center" && fontSizeBodySmall) ||
              (alignment === "left" && fontSizeHeading7)
            }
            lineHeight={this.paragraphLineHeight}
            style={[
              styles.textBodySmall,
              styles.intro.default,
              styles.intro[alignment],
            ]}
          >
            {intro}
          </ProfileIntro>
        }

        {interests && interests.length > 0 &&
          <TagList
            style={styles.tagList[alignment]}
            limit={interestsLimit}
            rows={10}
          >
            {interests.map((interest) => (
              <Tag key={interest}>{interest}</Tag>
            ))}
          </TagList>
        }
      </header>
    );
  }
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  intro: PropTypes.string,
  website: PropTypes.string,
  avatarSrc: PropTypes.string,
  location: PropTypes.string,
  interests: PropTypes.arrayOf(PropTypes.string),
  interestsLimit: PropTypes.number,
  alignment: PropTypes.oneOf(["center", "left"]),
  style: propTypes.style,
};

ProfileHeader.defaultProps = {
  intro: "",
  website: "",
  avatarSrc: "",
  location: "",
  interests: [],
  alignment: "center",
  style: null,
};

export default radium(ProfileHeader);
